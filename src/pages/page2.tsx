import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Resty } from "../libraries/resty";

export default function Page2() {
	const fetchData = async () => {
		const [status, error, data, headers] = await Resty.create()
			.get("/todos/2")
			.execute();
		return data;
	};

	const { data, refetch } = useQuery({
		queryKey: ["repoData"],
		queryFn: async () => {
			return await fetchData();
		},
	});
	return (
		<div>
			<div>{data?.title}</div>
			<Button
				label="Refetch"
				onClick={() => {
					refetch();
				}}
			/>
			<div className="bg-myCustomColor-600">Hello</div>
			<div className="card rounded-none">Hello Card</div>
		</div>
	);
}
