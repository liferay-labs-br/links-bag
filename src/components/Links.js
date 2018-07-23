import Component, {Config} from 'metal-jsx';

class Links extends Component {
	renderItems() {
		const {items} = this.props;

		console.log(items);

		return (
			<div>
				{items && items.map(({enabled, label, url}, index) => 
					enabled ? (
						<div key={index}>
							<a href={url} key={index}>{label}</a>
						</div>
					) : (
						<div key={index}>{label}</div>
					)
				)}
			</div>
		);
	}

	render() {
		return this.renderItems();
	}
}

Links.PROPS = {
	items: Config.arrayOf(
		Config.shapeOf({
			enabled: Config.bool(),
			label: Config.string(),
			url: Config.string()
		})
	)
};

export default Links;