import { Component } from "@angular/core";
import { DiagramSettings } from "./medaillenspiegel.constant";

@Component({
	selector: "app-medaillenspiegel",
	templateUrl: "./medaillenspiegel.component.html",
	styleUrls: ["./medaillenspiegel.component.sass"],
})
export class MedaillenspiegelComponent {
	public DiagramSettings = DiagramSettings;

	public label: Array<string> = [
		"Deutschland",
		"Russland",
		"USA",
		"Norwegen",
		"Italien",
	];

	public datasets = [
		{
			data: [10, 7, 6, 5, 4],
			label: "Gold",
			backgroundColor: "gold",
		},
		{
			data: [10, 7, 6, 5, 4],
			label: "Silber",
			backgroundColor: "silver",
		},
		{
			data: [10, 7, 6, 5, 4],
			label: "Bronze",
			backgroundColor: "#CD7F32",
		},
	];

	public plugins = [
		{
			id: "click",
			// biome-ignore lint/suspicious/noExplicitAny: noch nicht sicher
			afterEvent(chart: any, args: any) {
				if (args.event.type !== "click") {
					return;
				}
				const { x, y } = args.event;
				if (
					x < chart.scales.x.left &&
					y > chart.scales.y.top &&
					y < chart.scales.y.bottom
				) {
					const labelIndex = chart.scales.y.getValueForPixel(y);
					console.log(labelIndex); // gibt den Index des angeklickten Labels aus -> Routing zum entsprechenden Land
				}
			},
		},
	];
}
