import type { Options } from 'yargs';

// eslint-disable-next-line @typescript-eslint/ban-types
type OptionalArguments<Type = {}> = Type & {
  /** Non-option arguments */
  _?: (string | number)[];

  /** The script name or node command */
  $0?: string;

  /** All remaining options */
  [argName: string]: unknown;
};

type YargsArgs = {
  sourceMaps: boolean;
  stripComments: boolean;
  transformHtmlComments: boolean;
  port: number;
  dist: string;
  src: string;
  eval: boolean;
  outfileName: string;
  serve: boolean;
  directory?: string;
} & OptionalArguments;

type Option = {
  stripComments: boolean;
  transformHtmlComments: boolean;
} & Options;
