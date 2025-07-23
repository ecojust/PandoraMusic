export interface PandoraMusicOptions {
  apiUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
  [key: string]: any;
}

export interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  timeout?: number;
  data?: any;
}

export interface RequestResponse {
  data: any;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export declare class Request {
  constructor(config?: RequestOptions);
  get(url: string, options?: RequestOptions): Promise<RequestResponse>;
  post(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<RequestResponse>;
  request(url: string, options?: RequestOptions): Promise<RequestResponse>;
}

export declare const get: (
  url: string,
  options?: RequestOptions
) => Promise<RequestResponse>;
export declare const post: (
  url: string,
  data?: any,
  options?: RequestOptions
) => Promise<RequestResponse>;

export interface MusicData {
  title: string;
  artist: string;
  duration?: number;
  url?: string;
  [key: string]: any;
}

export interface PushResult {
  success: boolean;
  id: string;
  message: string;
}

export declare class PandoraMusic {
  constructor(options?: PandoraMusicOptions);
  pullMusic(query: string, options?: { limit?: number }): Promise<MusicData[]>;
  pushMusic(musicData: MusicData): Promise<PushResult>;
  getMusicDetail(id: string): Promise<MusicData>;
}

export declare const utils: {
  formatDuration(seconds: number): string;
  validateMusicData(musicData: any): boolean;
};

export default PandoraMusic;
