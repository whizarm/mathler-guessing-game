import { useState } from 'react';
import { GameState } from 'types';
import { AboutGame, Button, GameResult, Icon, Modal } from 'components';
import { currentGame } from 'modules/mathler';
import { joinClassNames } from 'modules/arrays';
import styles from './Header.module.scss';

type GameResultProps = {
  gameState: GameState;
  onNewPuzzle: () => void;
  onRetryPuzzle: () => void;
};

export const Header = ({
  gameState,
  onNewPuzzle,
  onRetryPuzzle,
}: GameResultProps) => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState<boolean>();

  const openHelpModal = () => setIsHelpModalOpen(true);
  const closeHelpModal = () => setIsHelpModalOpen(false);

  const openResultsModal = () => setIsResultsModalOpen(true);
  const closeResultsModal = () => setIsResultsModalOpen(false);

  const changePuzzle = () => {
    setIsHelpModalOpen(false);
    setIsResultsModalOpen(undefined);
    onNewPuzzle();
  };

  const retryPuzzle = () => {
    setIsHelpModalOpen(false);
    setIsResultsModalOpen(undefined);
    onRetryPuzzle();
  };

  const shouldShowResultsModal = isResultsModalOpen ?? gameState !== '';

  return (
    <header className={styles.header}>
      <div className={styles.sectionWithButtons}>
        <Button
          onClick={openHelpModal}
          className={styles.helpButton}
          testId="help-button"
        >
          <Icon icon="logo" />
        </Button>
        <h1 className={styles.title}>Mathler</h1>
        <Button
          onClick={openResultsModal}
          className={joinClassNames([
            styles.resultsButton,
            [gameState === '', styles.hide, styles.show],
          ])}
        >
          🏆
        </Button>
      </div>
      <div>
        Guess the hidden calculation that equals{' '}
        <span className={styles.valueToGuess}>{currentGame.valueToGuess}</span>
      </div>
      <Modal
        isOpen={shouldShowResultsModal}
        onClose={closeResultsModal}
        title="Game end"
        showWithDelay={!isResultsModalOpen}
      >
        <GameResult
          gameState={gameState}
          onNewPuzzle={changePuzzle}
          onRetryPuzzle={retryPuzzle}
        />
      </Modal>
      {!shouldShowResultsModal && isHelpModalOpen && (
        <Modal
          isOpen={isHelpModalOpen}
          onClose={closeHelpModal}
          title="How to play?"
        >
          <AboutGame />
        </Modal>
      )}
    </header>
  );
};
