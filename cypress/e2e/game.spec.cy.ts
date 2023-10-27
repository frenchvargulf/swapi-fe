import { GameSelectors } from "cypress/selectors/selectors";
import { MOCK_PERSONS } from "../data/MOCK-PERSONS";
import { compareMassInputsAndDetermineWinner } from '../../src/app/game/helpers';

describe('Game', () => {

  before(() => {
    let interceptCount = 0;

    cy.intercept('/api/people/*', (req) => {
      req.reply(res => {
          res.send(MOCK_PERSONS[interceptCount]);
          interceptCount+=1;
      });
    }).as('swapiGetRequest');
  });

  it('should play the game and determine a winner', () => {
    cy.visit('/');

    cy.wait('@swapiGetRequest');
    cy.wait('@swapiGetRequest');

    let leftCardMass, rightCardMass;
    cy.get(GameSelectors.LeftCardMass).invoke('text').then((text) => {
      leftCardMass = parseFloat(text);
    });

    cy.get(GameSelectors.RightCardMass).invoke('text').then((text) => {
      rightCardMass = parseFloat(text);
    });

    const expectedWinner = `${compareMassInputsAndDetermineWinner(leftCardMass!, rightCardMass!)} wins !`;
    cy.get(GameSelectors.Winner).should('have.text', expectedWinner);

    cy.log('Replay game');
    cy.get(GameSelectors.PlayAgainButton).click();

    cy.wait('@swapiGetRequest');
    cy.wait('@swapiGetRequest');

    let updatedLeftCardMass: number, updatedRightCardMass: number;
    cy.get(GameSelectors.LeftCardMass).invoke('text').then((text) => {
      updatedLeftCardMass = parseFloat(text);
      cy.get(GameSelectors.RightCardMass).invoke('text').then((text) => {
        updatedRightCardMass = parseFloat(text);
        const expectedWinnerInNextGame = `${compareMassInputsAndDetermineWinner(updatedLeftCardMass!, updatedRightCardMass!)} wins !`;
        cy.get(GameSelectors.Winner).should('have.text', expectedWinnerInNextGame);
      });
    });
  });
});

