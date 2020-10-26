import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../contexts/firebase";
import { UserContext } from "../contexts/firebase/UserContext";
import AddFunds from "./AddFunds";

const FundingModel: React.FC = (props) => {
	const db = useContext(FirebaseContext);
	const [currentBudget, setCurrentBudget] = useState<number>();
	const { user } = useContext(UserContext);

	useEffect(() => {
		getBudget();
	}, []);

	const handleUpdate = async (mode: "add" | "subtract", update: number) => {
		console.log(update);
		console.log(currentBudget);
		if (update && currentBudget !== undefined && currentBudget !== null) {
			updateFunds(update);
		}

		async function updateFunds(update: number) {
			console.log(update);

			if (mode === "add") {
				db.collection("budgets")
					.doc(user?.uid)
					.set(
						{
							total: update + (currentBudget as number),
						},
						{ merge: true }
					);

				setCurrentBudget((currentBudget as number) + (update as number));
			} else {
				db.collection("budgets")
					.doc(user?.uid)
					.set(
						{
							total: (currentBudget as number) - update,
						},
						{ merge: true }
					);

				setCurrentBudget((currentBudget as number) - (update as number));
			}
		}
	};

	const getBudget = async () => {
		db.collection("budgets").doc(user?.uid).set({ total: 0 }, { merge: true });
		let info: number = 0;
		await db
			.collection("budgets")
			.doc(user?.uid)
			.onSnapshot((doc) => {
				if (doc.exists) {
					const data = doc.data();
					info = data?.total;
					setCurrentBudget(info);
				} else {
					console.error("doc does not exist");
				}
			});
		return info;
	};

	return <AddFunds handleUpdate={handleUpdate} currentBudget={currentBudget} />;
};

export default FundingModel;
