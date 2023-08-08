import { useState } from 'react';
import { GameState } from 'types';
import { Button, Modal } from 'components';

type GameResultProps = {
  gameState: GameState;
  onNewPuzzle: () => void;
  onRetryPuzzle: () => void;
};

export const GameResult = ({
  gameState,
  onNewPuzzle,
  onRetryPuzzle,
}: GameResultProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const closeModal = () => setIsModalOpen(false);
  const shouldShowModal = isModalOpen ?? gameState !== '';

  return (
    <Modal
      isOpen={shouldShowModal}
      onClose={closeModal}
      title="Game Over"
      showWithDelay={true}
    >
      <div>
        {gameState === 'WON' && (
          <>
            <h3>
              Congratulations! You&#39;ve won 🎉
              <Button onClick={onNewPuzzle}>
                Do you want to play a random puzzle?
              </Button>
            </h3>
          </>
        )}
        {gameState === 'LOST' && (
          <>
            <h3>
              Oh no! You&#39;ve lost 🥹
              <Button onClick={onRetryPuzzle}>Try again?</Button>
            </h3>
          </>
        )}
      </div>
    </Modal>
  );
};
