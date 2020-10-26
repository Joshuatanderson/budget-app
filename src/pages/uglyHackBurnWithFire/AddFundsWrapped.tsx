import React, { useContext, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { FirebaseContext } from "../../contexts/firebase";
import { UserContext } from "../../contexts/firebase/UserContext";
import AddFunds from ".././addFunds/AddFunds";

interface AddFundsWrappedProps {
	ViewComponent: React.Component<{} & RouteComponentProps<{}>, null>;
}

function AddFundsWrapped() {
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
					db.collection("budgets")
						.doc(user?.uid)
						.set({ total: 0 }, { merge: true });

					console.error("doc does not exist");
				}
			});
		return info;
	};

	return <AddFunds handleUpdate={handleUpdate} currentBudget={currentBudget} />;
}

export default AddFundsWrapped;
