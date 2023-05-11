import { act, fireEvent, render, screen } from '@testing-library/react';
import Modal from '.';
import { Mock } from 'vitest';

describe('Modal', () => {
  let onClose: Mock<any, any>;
  beforeEach(() => {
    onClose = vi.fn();
  });
  describe('Render Tests', () => {
    it('Should render the component', () => {
      const { container } = render(<Modal show={true} onClose={onClose} />);
      expect(container.getElementsByClassName('modal').length).toBe(1);
    });

    it('should render the children', () => {
      render(
        <Modal show={true} onClose={onClose}>
          <div>Name</div>
        </Modal>
      );
      expect(screen.getByText('Name')).toBeInTheDocument();
    });

    it('should render the title', () => {
      render(<Modal show={true} onClose={onClose} titleText="title" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render close button when no flag', () => {
      const { container } = render(<Modal show={true} onClose={onClose} />);
      expect(container.getElementsByClassName('close-icon').length).toBe(1);
    });

    it('should not render close button when flag', () => {
      const { container } = render(
        <Modal show={true} onClose={onClose} noCloseIcon={true} />
      );
      expect(container.getElementsByClassName('close-icon').length).toBe(0);
    });
  });

  describe('Input Tests', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });
    it('should close by button', () => {
      const { container } = render(<Modal show={true} onClose={onClose} />);
      const button = container.getElementsByClassName('close-icon')[0];
      fireEvent.click(button);
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(onClose).toBeCalledTimes(1);
    });
    it('should close by back-drop', () => {
      const { container } = render(<Modal show={true} onClose={onClose} />);
      const bg = container.getElementsByClassName('modal-bg')[0];
      fireEvent.click(bg);
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(onClose).toBeCalledTimes(1);
    });

    it('should close by key-press', () => {
      render(<Modal show={true} onClose={onClose} />);
      fireEvent.keyUp(global.document, {
        key: 'Escape',
      });
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(onClose).toBeCalledTimes(1);
    });
  });
});
