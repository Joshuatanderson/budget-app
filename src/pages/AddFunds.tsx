import React, {
	useContext,
	useState,
	useEffect,
} from "react";
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
import "./AddFunds.css";
import { FirebaseContext } from "../contexts/firebase";
import { User } from "firebase";

interface LocationModel {
	state: {
		user: User;
	};
}

const AddFunds: React.FC = (props) => {
	const db = useContext(FirebaseContext);
	const [text, setText] = useState<number>();
	const [currentBudget, setCurrentBudget] = useState<number>(0);

	useEffect(() => {
		fetchBudgetData();
		async function fetchBudgetData() {
			const current = await getInfo();
			if (current) {
				setCurrentBudget(current);
			} else {
				console.error("unable to set current budget");
			}
		}
	}, []);

	const handleInput = (update: string) => {
		setText(parseInt(update));
	};

	const handleSubmit = async () => {
		if (text && currentBudget) {
			const newTotal = (currentBudget as number) + text;
			addFunds();
		}

		async function addFunds() {
			db.collection("budgets").doc("main").update({
				total: text,
			});

			setCurrentBudget((text as number) + (currentBudget as number));
			setText(0);
		}
	};

	const getInfo = async () => {
		let info: number = 0;
		await db
			.collection("budgets")
			.doc("main")
			.get()
			.then((doc) => {
				if (doc.exists) {
					const data = doc.data();
					info = data?.total;
				} else {
					console.error("doc does not exist");
				}
			})
			.catch((err) => console.error(err));
		console.log(typeof info);
		return info;
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Welcome, </IonTitle>
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
					<IonButton onClick={handleSubmit}>Submit</IonButton>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default AddFunds;
