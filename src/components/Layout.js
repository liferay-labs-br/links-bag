import Component from 'metal-jsx';
import getCN from 'classnames';

const CLASSNAME = 'layout';

const Header = ({children, elementClasses}) => {
	const classNameContainer = getCN(
		`${CLASSNAME}-container`, elementClasses
	);

	return (
		<div class={`${CLASSNAME}-header`}>
			<div class={classNameContainer}>{children}</div>
		</div>
	);
};

const Main = ({children, elementClasses}) => {
	const classNameContainer = getCN(
		`${CLASSNAME}-container`, elementClasses
	);

	return (
		<div class={`${CLASSNAME}-main`}>
			<div class={classNameContainer}>{children}</div>
		</div>
	);
};

const Footer = ({children, elementClasses}) => {
	const classNameContainer = getCN(
		`${CLASSNAME}-container`, elementClasses
	);

	return (
		<div class={`${CLASSNAME}-footer`}>
			<div class={classNameContainer}>{children}</div>
		</div>
	);
};

class Layout extends Component {
	render() {
		const {children} = this.props;

		return <div class={CLASSNAME}>{children}</div>;
	}
}

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;

export default Layout;