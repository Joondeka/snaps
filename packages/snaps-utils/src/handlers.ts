import type { Component } from '@metamask/snaps-ui';
import type { Json, JsonRpcRequest } from '@metamask/utils';

/**
 * The `onRpcRequest` handler. This is called whenever a JSON-RPC request is
 * made to the snap.
 *
 * @param args - The request arguments.
 * @param args.origin - The origin of the request. This can be the ID of another
 * snap, or the URL of a dapp.
 * @param args.request - The JSON-RPC request sent to the snap.
 * @returns The JSON-RPC response. This must be a JSON-serializable value.
 */
export type OnRpcRequestHandler<
  Params extends Json[] | Record<string, Json> | undefined =
    | Json[]
    | Record<string, Json>
    | undefined,
> = (args: {
  origin: string;
  request: JsonRpcRequest<Params>;
}) => Promise<unknown>;

/**
 * The response from a snap's `onTransaction` handler.
 *
 * @property content - A custom UI component, that will be shown in MetaMask. Can be created using `@metamask/snaps-ui`.
 *
 * If the snap has no insights about the transaction, this should be `null`.
 */
export type OnTransactionResponse = {
  content: Component | null;
};

/**
 * The `onTransaction` handler. This is called whenever a transaction is
 * submitted to the snap. It can return insights about the transaction, which
 * will be displayed to the user.
 *
 * @param args - The request arguments.
 * @param args.transaction - The transaction object.
 * @param args.chainId - The CAIP-2 chain ID of the network the transaction is
 * being submitted to.
 * @param args.transactionOrigin - The origin of the transaction. This is the
 * URL of the dapp that submitted the transaction.
 * @returns Insights about the transaction. See {@link OnTransactionResponse}.
 */
// TODO: Improve type.
export type OnTransactionHandler = (args: {
  transaction: { [key: string]: Json };
  chainId: string;
  transactionOrigin?: string;
}) => Promise<OnTransactionResponse>;

/**
 * The `onCronjob` handler. This is called on a regular interval, as defined by
 * the snap's manifest.
 *
 * @param args - The request arguments.
 * @param args.request - The JSON-RPC request sent to the snap.
 */
export type OnCronjobHandler<
  Params extends Json[] | Record<string, Json> | undefined =
    | Json[]
    | Record<string, Json>
    | undefined,
> = (args: { request: JsonRpcRequest<Params> }) => Promise<unknown>;

/**
 * All the function-based handlers that a snap can implement.
 */
export type SnapFunctionExports = {
  onRpcRequest?: OnRpcRequestHandler;
  onTransaction?: OnTransactionHandler;
  onCronjob?: OnCronjobHandler;
};

/**
 * All handlers that a snap can implement.
 */
export type SnapExports = SnapFunctionExports;
