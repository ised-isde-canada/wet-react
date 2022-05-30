import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Lightbox from '@components/Lightbox';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('Lightbox', () => {
  describe('Test Lightbox', () => {
    test('renders the basic Lightbox component', () => {
      render(<Lightbox>children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
    });
    test('renders the Lightbox component with title/footer', () => {
      render(<Lightbox title="titleText">children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
      expect(screen.getByText('children')).toHaveAttribute(
        'title',
        'titleText'
      );
    });
    test('renders the Lightbox component with src', () => {
      render(<Lightbox src="srcText">children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
      expect(screen.getByText('children')).toHaveAttribute('href', 'srcText');
    });
    test('renders the Lightbox component with hidden', () => {
      render(<Lightbox hidden>children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
      expect(screen.getByText('children')).toHaveAttribute('hidden', '');
    });
  });
  describe('Test Lightbox functionality', () => {
    test('click basic lightbox', () => {
      render(<Lightbox>children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
      fireEvent.click(screen.getByText('children'));
      expect(screen.getByText('children').closest('body')).toHaveClass(
        'mfp-zoom-out-cur'
      );
      expect(screen.getByText('children').closest('body')).toHaveClass(
        'wb-modal'
      );
      expect(
        screen.getByText('children').closest('.lightbox-breezy')?.childNodes[1]
      ).toHaveClass('mfp-bg');
      expect(
        screen.getByText('children').closest('.lightbox-breezy')?.childNodes[1]
      ).toHaveClass('mfp-ready');
      expect(
        screen.getByText('children').closest('.lightbox-breezy')?.childNodes[2]
          ?.childNodes[0]
      ).toHaveAttribute('open', 'open');
    });
    test('click basic lightbox, then close with esc', () => {
      render(<Lightbox>children</Lightbox>);
      fireEvent.click(screen.getByText('children'));
      fireEvent.keyDown(screen.getByText('children'), {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      });
      expect(screen.getByText('children').closest('body')).not.toHaveClass(
        'mfp-zoom-out-cur'
      );
      expect(screen.getByText('children').closest('body')).not.toHaveClass(
        'wb-modal'
      );
      expect(
        screen.getByText('children').closest('.lightbox-breezy')?.childNodes[1]
      ).not.toHaveClass('mfp-bg');
      expect(
        screen.getByText('children').closest('.lightbox-breezy')?.childNodes[1]
      ).not.toHaveClass('mfp-ready');
      expect(
        screen.getByText('children').closest('.lightbox-breezy')?.childNodes[2]
          ?.childNodes[0]
      ).not.toHaveAttribute('open', 'open');
    });
    test('renders the Lightbox component with props, checks entire lightbox display', () => {
      render(
        <Lightbox src="srcText" title="titleText">
          children
        </Lightbox>
      );
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
      expect(screen.getByText('children')).toHaveAttribute('href', 'srcText');
      expect(screen.getByText('children')).toHaveAttribute(
        'title',
        'titleText'
      );
      expect(
        screen.getByText('children')?.parentNode?.childNodes[1]
      ).toHaveAttribute('role', 'link');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[1]
      ).toHaveAttribute('tabIndex', '0');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[1]
      ).toHaveAttribute('aria-label', 'Close Lightbox');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2]
      ).toHaveClass('mfp-close-btn-in');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2]
      ).toHaveClass('mfp-auto-cursor');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2]
      ).toHaveClass('mfp-ready');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2]
      ).toHaveAttribute('style', 'overflow: hidden auto;');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
      ).toHaveClass('mfp-container');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0]
      ).toHaveClass('mfp-container');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0]
      ).toHaveClass('mfp-s-ready');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0]
      ).toHaveClass('mfp-image-holder');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0]
      ).toHaveClass('mfp-content');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0]
      ).toHaveAttribute('aria-labelledby', 'lbx-title');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0]
      ).toHaveAttribute('data-pgtitle', 'Lightbox');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0]
      ).toHaveClass('mfp-figure');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].childNodes[0]
      ).toHaveAttribute('title', 'Close overlay (escape key)');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].childNodes[0]
      ).toHaveAttribute('type', 'button');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].childNodes[0]
      ).toHaveClass('mfp-close');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1]
      ).toHaveClass('wb-inv');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0]
      ).toHaveClass('mfp-img');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0]
      ).toHaveAttribute('src', 'srcText');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1]
          .childNodes[0]
      ).toHaveClass('mfp-bottom-bar');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1]
          .childNodes[0]
      ).toHaveAttribute('id', 'lbx-title');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1]
          .childNodes[0].childNodes[0]
      ).toHaveClass('mfp-title');
      expect(
        screen.getByText('children')?.parentNode?.childNodes[2].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1]
          .childNodes[0].childNodes[1]
      ).toHaveClass('mfp-counter');
    });
  });
  describe('Test gallery', () => {
    test('Test standard gallery component', () => {
      render(
        <Lightbox.Gallery>
          children
          <Lightbox />
        </Lightbox.Gallery>
      );
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children').parentNode).toHaveClass('lbx-gal');
      expect(screen.getByText('children').parentNode).toHaveClass('wb-init');
      expect(screen.getByText('children').parentNode).toHaveClass(
        'wb-lbx-inited'
      );
    });
    test('Test standard gallery component with hide', () => {
      render(
        <Lightbox.Gallery hide>
          children
          <Lightbox />
        </Lightbox.Gallery>
      );
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children').parentNode).not.toHaveClass(
        'lbx-gal'
      );
      expect(screen.getByText('children').parentNode).toHaveClass(
        'lbx-hide-gal'
      );
      expect(screen.getByText('children').parentNode).toHaveClass('wb-init');
      expect(screen.getByText('children').parentNode).toHaveClass(
        'wb-lbx-inited'
      );
    });
    test('Test standard gallery component with custom tag', () => {
      render(
        <Lightbox.Gallery tag="div">
          children
          <Lightbox />
        </Lightbox.Gallery>
      );
      expect(screen.getByText('children').closest('div')).toBeInTheDocument();
      expect(screen.getByText('children').closest('div')).toHaveClass(
        'lbx-gal'
      );
      expect(screen.getByText('children').closest('div')).toHaveClass(
        'wb-init'
      );
      expect(screen.getByText('children').closest('div')).toHaveClass(
        'wb-lbx-inited'
      );
    });
    test('Test standard gallery component with open', () => {
      render(
        <Lightbox.Gallery>
          child
          <Lightbox src="srcText">children</Lightbox>
        </Lightbox.Gallery>
      );
      fireEvent.click(screen.getByText('children'));
      expect(screen.getByText('children').closest('body')).toHaveClass(
        'mfp-zoom-out-cur'
      );
      expect(screen.getByText('children').closest('body')).toHaveClass(
        'wb-modal'
      );
      expect(
        screen.getByText('child').parentNode?.childNodes[0]?.childNodes[0]
      ).toHaveClass('mfp-bg');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[0]
      ).toHaveClass('mfp-ready');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]
      ).toHaveAttribute('open', 'open');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
          ?.childNodes[1]?.childNodes[0]
      ).toHaveClass('mfp-img');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
          ?.childNodes[1]?.childNodes[0]
      ).toHaveAttribute('src', 'srcText');
      expect(
        screen.getByText('children').parentNode?.childNodes[0]
      ).not.toHaveClass('wb-lbx');
    });
    test('Test standard gallery component with open+hide', () => {
      render(
        <Lightbox.Gallery hide>
          child
          <Lightbox />
          <Lightbox src="srcText">children</Lightbox>
        </Lightbox.Gallery>
      );
      fireEvent.click(screen.getByText('children'));
      expect(
        screen.getByText('children').parentNode?.childNodes[0]
      ).not.toHaveClass('wb-lbx');
      expect(screen.getByText('child').parentNode).toHaveClass('lbx-hide-gal');
      expect(
        screen.getByText('children').parentNode?.childNodes[0]
      ).toHaveAttribute('hidden');
    });
    test('Test standard gallery component with open+close', () => {
      render(
        <Lightbox.Gallery>
          child
          <Lightbox src="srcText">children</Lightbox>
        </Lightbox.Gallery>
      );
      fireEvent.click(screen.getByText('children'));
      fireEvent.keyDown(screen.getByText('children'), {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      });
      expect(screen.getByText('children').closest('body')).not.toHaveClass(
        'mfp-zoom-out-cur'
      );
      expect(screen.getByText('children').closest('body')).not.toHaveClass(
        'wb-modal'
      );
      expect(
        screen.getByText('child').parentNode?.childNodes[0]?.childNodes[0]
      ).not.toHaveClass('mfp-bg');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[0]
      ).not.toHaveClass('mfp-ready');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]
      ).not.toHaveAttribute('open', 'open');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
          ?.childNodes[1]?.childNodes[0]
      ).toHaveClass('mfp-img');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
          ?.childNodes[1]?.childNodes[0]
      ).toHaveAttribute('src', 'srcText');
      expect(
        screen.getByText('children').parentNode?.childNodes[0]
      ).not.toHaveClass('wb-lbx');
    });
    test('Test standard gallery hide with open+close', () => {
      render(
        <Lightbox.Gallery hide>
          child
          <Lightbox />
          <Lightbox src="srcText">children</Lightbox>
        </Lightbox.Gallery>
      );
      fireEvent.click(screen.getByText('children'));
      fireEvent.keyDown(screen.getByText('children'), {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      });
      expect(screen.getByText('children').closest('body')).not.toHaveClass(
        'mfp-zoom-out-cur'
      );
      expect(screen.getByText('children').closest('body')).not.toHaveClass(
        'wb-modal'
      );
      expect(
        screen.getByText('child').parentNode?.childNodes[0]?.childNodes[0]
      ).not.toHaveClass('mfp-bg');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[0]
      ).not.toHaveClass('mfp-ready');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]
      ).not.toHaveAttribute('open', 'open');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
          ?.childNodes[1]?.childNodes[0]
      ).toHaveClass('mfp-img');
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
          ?.childNodes[1]?.childNodes[0]
      ).toHaveAttribute('src', 'srcText');
      expect(
        screen.getByText('children').parentNode?.childNodes[0]
      ).not.toHaveClass('wb-lbx');
      expect(
        screen.getByText('children').parentNode?.childNodes[0]
      ).not.toHaveClass('wb-lbx');
      expect(screen.getByText('child').parentNode).toHaveClass('lbx-hide-gal');
      expect(
        screen.getByText('children').parentNode?.childNodes[0]
      ).toHaveAttribute('hidden');
    });
    test('Test standard gallery component with open+next+prev', () => {
      render(
        <Lightbox.Gallery>
          child
          <Lightbox src="one" />
          <Lightbox src="two">children</Lightbox>
          <Lightbox src="three" />
        </Lightbox.Gallery>
      );
      fireEvent.click(screen.getByText('children'));
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
          ?.childNodes[1]?.childNodes[0]
      ).toHaveAttribute('src', 'two');
      fireEvent.click(screen.getAllByRole('button')[1]); // [0]=close, 1=left, 2=right
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
          ?.childNodes[1]?.childNodes[0]
      ).toHaveAttribute('src', 'one');
      fireEvent.click(screen.getAllByRole('button')[2]);
      fireEvent.click(screen.getAllByRole('button')[2]);
      expect(
        screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
          ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
          ?.childNodes[1]?.childNodes[0]
      ).toHaveAttribute('src', 'three');
    });
  });
  test('Test hide gallery component with open+next+prev', () => {
    render(
      <Lightbox.Gallery hide>
        child
        <Lightbox src="one" />
        <Lightbox src="two">children</Lightbox>
        <Lightbox src="three" />
      </Lightbox.Gallery>
    );
    fireEvent.click(screen.getByText('children'));
    expect(
      screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
        ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
        ?.childNodes[1]?.childNodes[0]
    ).toHaveAttribute('src', 'two');
    fireEvent.click(screen.getAllByRole('button')[1]); // [0]=close, 1=left, 2=right
    expect(
      screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
        ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
        ?.childNodes[1]?.childNodes[0]
    ).toHaveAttribute('src', 'one');
    fireEvent.click(screen.getAllByRole('button')[2]);
    fireEvent.click(screen.getAllByRole('button')[2]);
    expect(
      screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
        ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
        ?.childNodes[1]?.childNodes[0]
    ).toHaveAttribute('src', 'three');
    expect(
      screen.getByText('children').parentNode?.childNodes[0]
    ).toHaveAttribute('hidden');
  });

  test('Test gallery x button', () => {
    render(
      <Lightbox.Gallery hide>
        child
        <Lightbox src="one" />
        <Lightbox src="two">children</Lightbox>
        <Lightbox src="three" />
      </Lightbox.Gallery>
    );
    fireEvent.click(screen.getByText('children'));
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('children').closest('body')).not.toHaveClass(
      'mfp-zoom-out-cur'
    );
    expect(screen.getByText('children').closest('body')).not.toHaveClass(
      'wb-modal'
    );
    expect(
      screen.getByText('child').parentNode?.childNodes[0]?.childNodes[0]
    ).not.toHaveClass('mfp-bg');
    expect(
      screen.getByText('child').parentNode?.childNodes[0].childNodes[0]
    ).not.toHaveClass('mfp-ready');
    expect(
      screen.getByText('child').parentNode?.childNodes[0].childNodes[1]
        ?.childNodes[0]
    ).not.toHaveAttribute('open', 'open');
  });
});
