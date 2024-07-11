import "./App.scss";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "src/app/router";
import { store } from "src/app/store";

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
