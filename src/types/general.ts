export interface IPackage {
  name: string;
  version: string;
  author?: string;
  email?: string;
  homepage?: string;
  description?: string;
  repository?: { type: string; url: string };
  bugs?: { url: string };
  license?: string;
}