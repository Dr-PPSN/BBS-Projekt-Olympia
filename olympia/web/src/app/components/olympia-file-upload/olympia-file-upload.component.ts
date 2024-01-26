import {
	HttpClient,
	HttpEvent,
	HttpEventType,
	HttpProgressEvent,
} from "@angular/common/http";
import { Component, Input, signal } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Observable, Subscription, finalize } from "rxjs";

@Component({
	selector: "olympia-file-upload",
	standalone: true,
	imports: [MatProgressSpinnerModule],
	templateUrl: "./olympia-file-upload.component.html",
	styleUrl: "./olympia-file-upload.component.sass",
})
export class OlympiaFileUploadComponent {
	@Input() requiredFileType: string | null = null;
	@Input() apiEndpoint: string | null = null;
	@Input() refUuid: string | null = null;
	uploadProgress = signal(0);
	private uploadSubscription: Subscription | null = null;

	constructor(private http: HttpClient) {}

	// biome-ignore lint: muss any sein
	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		if (!file) {
			return;
		}
		this.uploadSubscription = this.uploadObservable(file).subscribe({
			next: (event) => {
				if (event.type !== HttpEventType.UploadProgress) {
					return;
				}
				this.updateUploadProgress(event);
			},
		});
	}

	// biome-ignore lint: muss any sein
	private uploadObservable(file: File): Observable<HttpEvent<any>> {
		if (!this.apiEndpoint) {
			throw new Error("apiEndpoint is not set");
		}
		const formData = new FormData();
		formData.append("file", file);
		formData.append("refUuid", this.refUuid || "");
		return this.http
			.post(this.apiEndpoint, formData, {
				reportProgress: true,
				observe: "events",
			})
			.pipe(finalize(() => this.resetUploadProgress()));
	}

	private updateUploadProgress(event: HttpProgressEvent) {
		if (!event.total) {
			return;
		}
		this.uploadProgress.set(Math.round(100 * (event.loaded / event.total)));
	}

	cancelUpload() {
		this.uploadSubscription?.unsubscribe();
		this.resetUploadProgress();
	}

	private resetUploadProgress() {
		this.uploadProgress.set(0);
	}
}
