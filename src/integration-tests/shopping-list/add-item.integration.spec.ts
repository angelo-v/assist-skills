import {describe, it, jest, expect} from "@jest/globals";

import nock from "nock";

import {build} from "../../app";


jest.mock("#output/say");

describe('add item to shopping list', () => {
    it('should find the shopping list trello card and add the item to the first checklist', async () => {
        const scope = nock("https://api.trello.test/1")
            .get("/boards/the-board-id/cards?filter=visible")
            .matchHeader(
                "Authorization",
                'OAuth oauth_consumer_key="the-consumer-key", oauth_token="the-token"'
            )
            .reply(200, [
                {
                    id: "1",
                    name: "Irrelevant card",
                    idChecklists: ["irrelevant-checklist-id"],
                },
                {
                    id: "2",
                    name: "Shopping List",
                    idChecklists: [
                        "first-shopping-checklist-id",
                        "second-shopping-checklist-id",
                    ],
                },
            ])
            .post(
                "/checklists/first-shopping-checklist-id/checkItems?name=🤖%20Banane"
            )
            .matchHeader("Content-Type", "application/x-www-form-urlencoded")
            .reply(200, {
                idChecklist: "first-shopping-checklist-id",
                state: "incomplete",
                id: "item-id",
                name: "banane",
                nameData: {
                    emoji: {},
                },
                pos: 2064384,
                due: null,
                idMember: null,
                limits: {},
            });

        const app = build()
        const response = await app.inject({
            method: 'POST',
            url: '/shopping-list',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                intent: "AddItem",
                item: "Banane",
                listName: "Shopping List",
                prefix: "🤖"
            })
        })

        expect(response.statusCode).toEqual(200);
        expect(response.headers['content-type']).toEqual("application/json; charset=utf-8");
        expect(response.json()).toEqual({message: "Banane hinzugefügt"});
        scope.done();
    });
});