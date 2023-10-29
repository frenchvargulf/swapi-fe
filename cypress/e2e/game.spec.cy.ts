import { GameSelectors } from "cypress/selectors/selectors";
import { compareValuesAndDetermineWinner, validateInput } from '../../src/app/game/helpers/helpers';
import { MOCK_RESPONSES } from "cypress/fixtures/MOCK-RESPONSES";
import { Winner } from "src/app/game/models/winner";

describe('Game', () => {

  before(() => {
    let interceptCount = 0;

    cy.intercept('/api/*/*', (req) => {
      req.reply(res => {
        res.send(MOCK_RESPONSES[interceptCount]);
        interceptCount += 1;
      });
    }).as('swapiGetRequest');
  });

  it('should play the game and determine a winner', () => {
    cy.visit('/');

    cy.log('Should play game on init with equal values and no winner')
    getCardPropertyValueInputsAndAssertWinner();

    cy.log('Replay game with different values and find a winner');
    const playAgainButton = cy.get(GameSelectors.PlayAgainButton);
    playAgainButton.click();

    getCardPropertyValueInputsAndAssertWinner();

    cy.log('Play game with mass unknown for 2 players');
    playAgainButton.click();

    getCardPropertyValueInputsAndAssertWinner();

    cy.log('Play game with mass unknown for 1 player');
    playAgainButton.click();

    getCardPropertyValueInputsAndAssertWinner();

    cy.log('Replay game with 404 error for 2 players');
    playAgainButton.click();

    getCardPropertyValueInputsAndAssertWinner();

    cy.log('Replay game with 404 error for 1 player');
    playAgainButton.click();

    getCardPropertyValueInputsAndAssertWinner();

    cy.log('Toggle mode and replay game');
    cy.get(GameSelectors.ChangeModeButton).click();

    getCardPropertyValueInputsAndAssertWinner();
  });
});


const getCardPropertyValueInputsAndAssertWinner = () => {
  cy.wait('@swapiGetRequest');
  cy.wait('@swapiGetRequest');

  let leftCardValue, rightCardValue;
  cy.get(GameSelectors.LeftCardMass).invoke('text').then((text) => {
    leftCardValue = validateInput(text);
    cy.get(GameSelectors.RightCardMass).invoke('text').then((text) => {
      rightCardValue = validateInput(text);
      const expectedWinner = `${compareValuesAndDetermineWinner(leftCardValue!, rightCardValue!)}`;
      cy.get(GameSelectors.Winner).should('have.text', expectedWinner);
      assertWinCount(expectedWinner);
    });
  });
};

const assertWinCount = (expectedWinner: string) => {
  cy.get(GameSelectors.LeftCardWinCount).invoke('text').then((winCount) => {
    const leftCardWinCountNumber = validateInput(winCount);
    cy.get(GameSelectors.RightCardWinCount).invoke('text').then((winCount) => {
      const rightCardWinCountNumber = validateInput(winCount);
  
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