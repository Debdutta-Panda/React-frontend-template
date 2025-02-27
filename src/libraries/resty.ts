export const backendUrlRetriever = () => {
	return "https://jsonplaceholder.typicode.com";
};

export class Resty {
	private _outputType: "json" | "text" | "blob" = "json";
	static create(): Resty {
		return new Resty();
	}
	private _csrfToken: string | null = null;
	private _enableCsrf: boolean = false;
	private readonly _csrfPath = "auth/csrf";
	private readonly _csrfHeader = "x-csrf-token";
	private readonly _csrfSessionIdHeader = "sessionId";
	private _csrfSessionId: string | null = null;
	csrf(id: string, enable: boolean = true): Resty {
		this._csrfSessionId = id;
		this._enableCsrf = enable;
		return this;
	}
	static applicatonJson = "application/json";
	private _path: string = "";
	private _baseUrl: string = backendUrlRetriever();
	private _queryParams: { [key: string]: string } = {};
	private _method:
		| "GET"
		| "POST"
		| "PUT"
		| "PATCH"
		| "DELETE"
		| "HEAD"
		| "OPTIONS" = "GET";
	private _credentials: RequestCredentials | undefined = "include";
	private _headers: HeadersInit | undefined = {};
	private _bodyObject: any = null;
	private _onOkCallback: ((data: any) => void) | null = null;
	private _onNotOkCallback: ((status: number, data: any) => void) | null =
		null;
	private _onErrorCallback: ((e: any) => void) | null = null;
	private _onDoneCallback:
		| ((status: number, e: any | null, data: any | null) => void)
		| null = null;
	private _formData: FormData | null = null;
	constructor() {
		//this.baseUrl(config.backendUrl());
	}
	private getLoginPath(): string | null{
		return null
	}
	private initiateFormData() {
		if (!this._formData) {
			this._formData = new FormData();
		}
	}
	formField(key: string, value: string): Resty {
		this.initiateFormData();
		this._formData?.append(key, value);
		return this;
	}
	file(key: string, file: File, name: string | null = null): Resty {
		this.initiateFormData();
		this._formData?.append(key, file, name || file.name);
		return this;
	}
	files(
		key: string,
		files: File[],
		names: string[] | null = null
	): Resty {
		this.initiateFormData();
		const r = this;
		files.forEach((file, index) => {
			const name = names ? names[index] : file.name;
			r._formData?.append(key, file, name);
		});
		return this;
	}
	filesMap(
		input: Record<string, File[]>,
		names: string[][] | null = null
	): Resty {
		this.initiateFormData();
		const r = this;
		Object.entries(
			([key, files]: [string, File[]], index: number) => {
				files.forEach((file, cIndex) => {
					const name = names
						? names[index][cIndex]
						: file.name;
					r._formData?.append(key, file, name);
				});
			}
		);
		return this;
	}
	path(path: string): Resty {
		this._path = path;
		return this;
	}
	baseUrl(baseUrl: string): Resty {
		this._baseUrl = baseUrl;
		return this;
	}
	queryParam(key: string, value: string): Resty {
		this._queryParams[key] = value;
		return this;
	}
	queryParams(queryParams: { [key: string]: string }): Resty {
		this._queryParams = queryParams;
		return this;
	}
	method(
		method:
			| "GET"
			| "POST"
			| "PUT"
			| "PATCH"
			| "DELETE"
			| "HEAD"
			| "OPTIONS"
	): Resty {
		this._method = method;
		return this;
	}
	get(path?: string) {
		if(path){
			this._path = path;
		}		
		this._method = "GET";
		return this;
	}
	post(path?: string) {
		if(path){
			this._path = path;
		}	
		this._method = "POST";
		return this;
	}
	patch(path?: string) {
		if(path){
			this._path = path;
		}	
		this._method = "PATCH";
		return this;
	}
	delete(path?: string) {
		if(path){
			this._path = path;
		}	
		this._method = "DELETE";
		return this;
	}
	credentials(credentials: RequestCredentials | undefined): Resty {
		this._credentials = credentials;
		return this;
	}
	contentType(type: string): Resty {
		if (!this._headers) {
			this._headers = {};
		}
		(this._headers as any)["content-type"] = type;
		return this;
	}
	header(key: string, value: string): Resty {
		if (!this._headers) {
			this._headers = {};
		}
		(this._headers as any)[key] = value;
		return this;
	}
	headers(headers: HeadersInit | undefined): Resty {
		this._headers = headers;
		return this;
	}
	bodyObject(obj: object): Resty {
		this._bodyObject = obj;
		this.contentType(Resty.applicatonJson);
		return this;
	}
	onOk(onOkCallback: (data: any) => void): Resty {
		this._onOkCallback = onOkCallback;
		return this;
	}
	onNotOk(onNotOkCallback: (data: any) => void): Resty {
		this._onNotOkCallback = onNotOkCallback;
		return this;
	}
	onError(onErrorCallback: (e: any) => void): Resty {
		this._onErrorCallback = onErrorCallback;
		return this;
	}
	onDone(
		onDoneCallback: (
			status: number,
			e: any,
			data: any | null
		) => void
	): Resty {
		this._onDoneCallback = onDoneCallback;
		return this;
	}
	json() {
		this._outputType = "json";
		return this;
	}
	text() {
		this._outputType = "text";
		return this;
	}
	blob() {
		this._outputType = "blob";
		return this;
	}
	async execute(): Promise<
		[
			status: number,
			e: any | null,
			data: any | null,
			headers: Headers | null
		]
	> {
		try {
			const config: RequestInit = {
				method: this._method,
				credentials: this._credentials,
				cache: "no-store",
			};
			if (this._bodyObject !== null) {
				config.body = JSON.stringify(this._bodyObject);
			} else if (this._formData) {
				config.body = this._formData;
			}
			if (Object.keys(this._headers as any).length > 0) {
				config.headers = this._headers;
			}
			if (this._enableCsrf) {
				const _config: RequestInit = {
					credentials: "include",
					method: "GET",
					headers: {},
					cache: "no-store",
				};
				(_config.headers as any)[
					this._csrfSessionIdHeader
				] = this._csrfSessionId;
				const csrfResponse = await fetch(
					this._baseUrl + this._csrfPath,
					_config
				);
				this._csrfToken = (
					await csrfResponse.json()
				).token;
				if (!config.headers) {
					config.headers = {};
				}
				(config.headers as any)[this._csrfHeader] =
					this._csrfToken;
			}
			const response = await fetch(
				this._baseUrl +
					this._path +
					this.getQueryParams(),
				config
			);
			if (
				this._path === this.getLoginPath() &&
				response.status === 200
			) {
				await this.onLoggedIn(response);
			}
			const status = response.status;
			if (status === 200) {
				const data = await this.resolveOutput(response);
				if (this._onOkCallback) {
					this._onOkCallback(data);
				}
				if (this._onDoneCallback) {
					this._onDoneCallback(200, null, data);
				}
				return [status, null, data, response.headers];
			} else {
				if (status === 401) {
					await this.onLoggedOut(response);
					window.location.href = this.getLoginPath() || "";
				}
				let data = {};
				try {
					data = await this.resolveOutput(
						response
					);
				} catch (e) {
					//
				}
				if (this._onNotOkCallback) {
					this._onNotOkCallback(status, data);
					if (this._onDoneCallback) {
						this._onDoneCallback(
							status,
							null,
							data
						);
					}
				}
				return [status, null, data, response.headers];
			}
		} catch (e) {
			if (this._onErrorCallback) {
				this._onErrorCallback(e);
			}
			if (this._onDoneCallback) {
				this._onDoneCallback(0, e, null);
			}
			return [0, e, null, null];
		}
	}
	async resolveOutput(response: Response): Promise<any> {
		switch (this._outputType) {
			case "json":
				return await response.json();
			case "text":
				return await response.text();
			case "blob":
				return await response.blob();
			default:
				return await response.json();
		}
	}
	getQueryParams(): string {
		const content = Object.entries(this._queryParams)
			.map(([key, value]) => `${key}=${value}`)
			.join("&");
		if (content === "") {
			return "";
		} else {
			return "?" + content;
		}
	}
	static async fetch(
		url: string
	): Promise<
		[
			status: number,
			e: any | null,
			data: any | null,
			headers: Headers | null
		]
	> {
		return await new Resty().path(url).execute();
	}

	async onLoggedIn(response: any) {
		
	}
	async onLoggedOut(response: any) {
		
	}
}
