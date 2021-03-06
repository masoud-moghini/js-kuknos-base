import xdr from '../generated/stellar-xdr_generated';
import { StrKey } from '../strkey';

/**
 * Transfers native balance to destination account.
 * @function
 * @alias Operation.accountMerge
 * @param {object} opts Options object
 * @param {string} opts.destination - Destination to merge the source account into.
 * @param {string} [opts.source] - The source account (defaults to transaction source).
 * @returns {xdr.AccountMergeOp} Account Merge operation
 */
export function accountMerge(opts) {
  const opAttributes = {};
  try {
    opAttributes.body = xdr.OperationBody.accountMerge(
      xdr.MuxedAccount.fromXDR(StrKey.decodeMuxedAccount(opts.destination))
    );
  } catch (e) {
    throw new Error('destination is invalid');
  }
  this.setSourceAccount(opAttributes, opts);

  return new xdr.Operation(opAttributes);
}
