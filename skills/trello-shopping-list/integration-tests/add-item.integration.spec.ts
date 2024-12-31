import {describe, it, jest, expect} from "@jest/globals";

import nock from "nock";

import {program} from "../src";

import {say} from "../src/say";

jest.mock("../src/say");

describe('add item to shopping list', () => {
    it('should find the shopping list trello card and add the item to the first checklist', async () => {
        const scope = nock("https://api.trello.com/1")
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
                "/checklists/first-shopping-checklist-id/checkItems?name=Banane"
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

        await program.parseAsync(["npx", "trello-shopping-list-assist-skill", "add-item", "Banane", "--list-name", "Shopping List"]);

        expect(say).toHaveBeenCalledWith("Banane hinzugefügt");
        scope.done();
    });
});