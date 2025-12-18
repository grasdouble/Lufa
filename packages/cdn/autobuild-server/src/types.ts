export interface PackageJson {
  name: string;
  version: string;
  type?: 'module' | 'commonjs';
  main?: string;
  module?: string;
  exports?: Record<string, string | { import?: string; default?: string }>;
  peerDependencies?: Record<string, string>;
}

export interface ExtractedParams {
  scope?: string;
  exportPath?: string;
  fullName: string;
  dirName: string;
  cdnPkgPath: string;
  tmpPkgPath: string;
}

export interface LoadLibraryResult {
  status: number;
  message: string;
}
