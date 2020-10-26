import React, { useContext, useState, useEffect } from "react";
import {
	IonCardHeader,
	IonContent,
	IonHeader,
	IonInput,
	IonPage,
	IonTitle,
	IonToolbar,
	IonCard,
	IonItem,
	IonLabel,
	IonButton,
	IonText,
} from "@ionic/react";
import "./AddFunds.css";
import { FirebaseContext } from "../../contexts/firebase";
import { User } from "firebase";
import { UserContext } from "../../contexts/firebase/UserContext";

export interface AddFundsModel {
	handleUpdate: (mode: "add", update: number) => void;
	currentBudget: number | undefined;
}

const AddFunds = ({
	// handleInput,
	handleUpdate,
	currentBudget,
}: AddFundsModel) => {
	// const db = useContext(FirebaseContext);
	const [text, setText] = useState<number | undefined>();
	const { user } = useContext(UserContext);

	// useEffect(() => {
	// 	fetchBudgetData();
	// 	async function fetchBudgetData() {
	// 		const current = await getInfo();
	// 		if (current) {
	// 			setCurrentBudget(current);
	// 		} else {
	// 			console.error("unable to set current budget");
	// 		}
	// 	}
	// }, []);

	const handleInput = (update: string) => {
		setText(parseInt(update));
	};

	const handleSubmit = () => {
		if (text) {
			handleUpdate("add", text);
		}
		setText(undefined);
};
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Add Funds - {user?.displayName} </IonTitle>
					<IonTitle color="light"></IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Add Funds</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonCard>
					<IonCardHeader>
						Current funding amount: ${currentBudget}
					</IonCardHeader>
					<IonItem>
						<IonLabel>New funding</IonLabel>
						<IonInput
							value={text}
							onIonChange={(e: CustomEvent) => handleInput(e.detail.value)}
							type="number"
						/>
					</IonItem>
					<IonButton onClick={() => handleSubmit()}>Submit</IonButton>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default AddFunds;
