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
} from "@ionic/react";
import "./SubtractFunds.css";
import { FirebaseContext } from "../../contexts/firebase";
import { User } from "firebase";
import { UserContext } from "../../contexts/firebase/UserContext";

export interface SubtractFundsModel {
	handleUpdate: (mode: "subtract" | "add", update: number) => void;
	currentBudget: number | undefined;
}

const SubtractFunds = ({ handleUpdate, currentBudget }: SubtractFundsModel) => {
	const db = useContext(FirebaseContext);
	const [text, setText] = useState<number>();
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

	const handleSubmit = (update: number | undefined) => {
		if (update) {
			handleUpdate("subtract", update);
		}
		setText(0);
	};
	// const handleSubmit = async () => {
	// 	if (text && currentBudget) {
	// 		const newTotal = (currentBudget as number) - text;
	// 		subtractFunds();
	// 	}

	// 	async function subtractFunds() {
	// 		db.collection("budgets").doc(user?.uid).update({
	// 			total: text,
	// 		});

	// 		setCurrentBudget((currentBudget as number) - (text as number));
	// 		setText(0);
	// 	}
	// };

	// const getInfo = async () => {
	// 	let info: number = 0;
	// 	await db
	// 		.collection("budgets")
	// 		.doc(user?.uid)
	// 		.get()
	// 		.then((doc) => {
	// 			if (doc.exists) {
	// 				const data = doc.data();
	// 				info = data?.total;
	// 			} else {
	// 				console.error("doc does not exist");
	// 			}
	// 		})
	// 		.catch((err) => console.error(err));
	// 	console.log(typeof info);
	// 	return info;
	// };

	// console.log(user);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Subtract Funds - {user?.displayName} </IonTitle>
					<IonTitle color="light"></IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">
							Subract Funds - {user?.displayName}
						</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonCard>
					<IonCardHeader>
						Current funding amount: ${currentBudget}
					</IonCardHeader>
					<IonItem>
						<IonLabel>Expenditure Amount</IonLabel>
						<IonInput
							value={text}
							onIonChange={(e: CustomEvent) => handleInput(e.detail.value)}
							type="number"
						/>
					</IonItem>
					<IonButton onClick={() => handleSubmit(text)}>Submit</IonButton>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default SubtractFunds;
