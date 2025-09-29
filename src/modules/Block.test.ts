import { expect, use } from 'chai';
import Block from './Block';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

describe('Block Component', () => {
  class Button extends Block {
    render() {
      return `<button>{{text}}</button>`;
    }
  };
  const btnText = 'Click Me!';
  use(sinonChai);

  it('рендерит props', () => {
    const btn = new Button({ text: btnText });
    const res = btn.element?.innerHTML;
    expect(res).to.equal(btnText);
  });

  it('управляет событиями, записанными в props', () => {
    const handler = sinon.stub();
    const btn = new Button({
      text: btnText,
      events: {
        click: handler
      }
    });

    const clickEvent = new MouseEvent('click');
    btn.element?.dispatchEvent(clickEvent);

    expect(handler).to.have.been.calledOnce;
  });

  it('рендерит в случае обновления props', () => {
    const btn = new Button();
    const spy = sinon.spy(btn, 'render');
    btn.setProps({ text: btnText });
    expect(spy).to.have.been.calledOnce;
  });

  it('исчезает при использовании метода hide', () => {
    const btn = new Button();
    btn.hide();
    expect(btn.getContent().style.display).to.equal('none');
  });

  it('появляется при использовании метода show', () => {
    const btn = new Button();
    btn.hide();
    btn.show();
    expect(btn.getContent().style.display).not.to.equal('none');
  });
});
