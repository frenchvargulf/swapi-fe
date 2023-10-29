import { GameSelectors } from "cypress/selectors/selectors";
import { compareMassInputsAndDetermineWinner, validatePersonMassInput } from '../../src/app/game/helpers/helpers';
import { MOCK_RESPONSES } from "cypress/fixtures/MOCK-RESPONSES";
import { Winner } from "src/app/game/models/winner";

describe('Game', () => {

  before(() => {
    let interceptCount = 0;

    cy.intercept('/api/people/*', (req) => {
      req.reply(res => {
        res.send(MOCK_RESPONSES[interceptCount]);
        interceptCount += 1;
      });
    }).as('swapiGetRequest');
  });

  it('should play the game and determine a winner', () => {
    cy.visit('/');

    cy.log('Should play game on init with equal values and no winner')
    getCardMassInputsAndAssertWinner();

    cy.log('Replay game with different values and find a winner');
    const playAgainButton = cy.get(GameSelectors.PlayAgainButton);
    playAgainButton.click();

    getCardMassInputsAndAssertWinner();

    cy.log('Play game with mass unknown for 2 players');
    playAgainButton.click();

    getCardMassInputsAndAssertWinner();

    cy.log('Play game with mass unknown for 1 player');
    playAgainButton.click();

    getCardMassInputsAndAssertWinner();

    cy.log('Replay game with 404 error for 2 players');
    playAgainButton.click();

    getCardMassInputsAndAssertWinner();

    cy.log('Replay game with 404 error for 1 player');
    playAgainButton.click();

    getCardMassInputsAndAssertWinner();
  });
});


const getCardMassInputsAndAssertWinner = () => {
  cy.wait('@swapiGetRequest');
  cy.wait('@swapiGetRequest');

  let leftCardMass, rightCardMass;
  cy.get(GameSelectors.LeftCardMass).invoke('text').then((text) => {
    leftCardMass = validatePersonMassInput(text);
    cy.get(GameSelectors.RightCardMass).invoke('text').then((text) => {
      rightCardMass = validatePersonMassInput(text);
      const expectedWinner = `${compareMassInputsAndDetermineWinner(leftCardMass!, rightCardMass!)}`;
      cy.get(GameSelectors.Winner).should('have.text', expectedWinner);
      assertWinCount(expectedWinner);
    });
  });
};

const assertWinCount = (expectedWinner: string) => {
  cy.get(GameSelectors.LeftCardWinCount).invoke('text').then((winCount) => {
    const leftCardWinCountNumber = validatePersonMassInput(winCount);
    cy.get(GameSelectors.RightCardWinCount).invoke('text').then((winCount) => {
      const rightCardWinCountNumber = validatePersonMassInput(winCount);
  
      if (Winner.LeftCard === expectedWinner) {
        cy.get(GameSelectors.LeftCardWinCount).should('have.text', leftCardWinCountNumber);
        cy.get(GameSelectors.RightCardWinCount).should('have.text', rightCardWinCountNumber);  
      } else if (Winner.RightCard === expectedWinner) {
        cy.get(GameSelectors.LeftCardWinCount).should('have.text', leftCardWinCountNumber);
        cy.get(GameSelectors.RightCardWinCount).should('have.text', rightCardWinCountNumber);  
      }
    })
  })
}