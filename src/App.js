import Component from 'metal-jsx';
import Layout from './components/Layout';
import Links from './components/Links';
import './style/main.scss';

class App extends Component {
	render() {
		return (
			<Layout>
				<Layout.Header />

				<Layout.Main>
					<Links items={[
						{
							label: "👨‍💻 Frontend Guild",
							enabled: false,
							type: 'normal'
						},
						{
							label: 'item 1',
							enabled: true,
							url: '#'
						},
						{
							label: 'item 1',
							enabled: true,
							url: '#'
						},
						{
							label: 'item 1',
							enabled: true,
							url: '#'
						},
						{
							label: 'item 1',
							enabled: true,
							url: '#'
						},
						{
							label: 'item 1',
							enabled: true,
							url: '#'
						}
					]} />
				</Layout.Main>

				<Layout.Footer elementClasses={'d-flex justify-content-between'}>
					<div>{'version 0.0.1'}</div>
					<div>{'Made with ️❤ on Friday Labs'}</div>
				</Layout.Footer>
			</Layout>
		);
	}
}

export default App;