import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import AddFunds from "./pages/AddFunds";
import SubtractFunds from "./pages/SubtractFunds";
import Tab3 from "./pages/Tab3";

import { FirebaseContext } from "./contexts/firebase/index";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { db } from "./contexts/firebase/db";
import Auth from "./pages/Auth";
import { User } from "firebase";
import { UserContext } from "./contexts/firebase/UserContext";

const App: React.FC = () => {
	const [user, setUser] = useState<User>();

	return (
		<FirebaseContext.Provider value={db}>
			<UserContext.Provider value={{ user, setUser }}>
				<IonApp>
					{!user && <Auth user={user} setUser={setUser} />}
					{user && (
						<IonReactRouter>
							<IonTabs>
								<IonRouterOutlet>
									<Route path="/tab1" component={AddFunds} exact={true} />
									<Route path="/tab2" component={SubtractFunds} exact={true} />
									<Route path="/tab3" component={Tab3} />
									<Route
										path="/"
										render={() => <Redirect to="/tab1" />}
										exact={true}
									/>
								</IonRouterOutlet>
								<IonTabBar slot="bottom">
									<IonTabButton tab="tab1" href="/tab1">
										<IonIcon icon={triangle} />
										<IonLabel>Add Funds</IonLabel>
									</IonTabButton>
									<IonTabButton tab="tab2" href="/tab2">
										<IonIcon icon={ellipse} />
										<IonLabel>Subtract Funds</IonLabel>
									</IonTabButton>
									{/* <IonTabButton tab="tab3" href="/tab3">
										<IonIcon icon={square} />
										<IonLabel>Tab 3</IonLabel>
									</IonTabButton> */}
								</IonTabBar>
							</IonTabs>
						</IonReactRouter>
					)}
				</IonApp>
			</UserContext.Provider>
		</FirebaseContext.Provider>
	);
};

export default App;
