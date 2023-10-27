import { GameSelectors } from "cypress/selectors/selectors";
import { MOCK_PERSONS } from "../data/MOCK-PERSONS";

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
    cy.get(GameSelectors.Winner).should('have.text', '');

    cy.wait('@swapiGetRequest');
    cy.wait('@swapiGetRequest');

    let leftCardMass, rightCardMass;
    cy.get(GameSelectors.LeftCardMass).invoke('text').then((text) => {
      leftCardMass = parseFloat(text);
    });

    cy.get(GameSelectors.RightCardMass).invoke('text').then((text) => {
      rightCardMass = parseFloat(text);
    });

    cy.get(GameSelectors.PlayAgainButton).click();

    cy.wait('@swapiGetRequest');
    cy.wait('@swapiGetRequest');

    let updatedLeftCardMass, updatedRightCardMass;
    cy.get(GameSelectors.LeftCardMass).invoke('text').then((text) => {
      updatedLeftCardMass = parseFloat(text);
    });
    cy.get(GameSelectors.RightCardMass).invoke('text').then((text) => {
      updatedRightCardMass = parseFloat(text);
    });

    const expectedWinner = leftCardMass! >= rightCardMass! ? 'Left Card' : 'Right Card';

    cy.get(GameSelectors.Winner).should('have.text', expectedWinner);
  });
});

