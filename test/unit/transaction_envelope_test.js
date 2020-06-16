describe('TransactionEnvelope', function() {
  it('can successfully decode an envelope', function(done) {
    // from https://github.com/stellar/js-stellar-sdk/issues/73
    let xdr =
      'AAAAAPQQv+uPYrlCDnjgPyPRgIjB6T8Zb8ANmL8YGAXC2IAgAAAAZAAIteYAAAAHAAAAAAAAAAAAAAABAAAAAAAAAAMAAAAAAAAAAUVVUgAAAAAAUtYuFczBLlsXyEp3q8BbTBpEGINWahqkFbnTPd93YUUAAAAXSHboAAAAABEAACcQAAAAAAAAAKIAAAAAAAAAAcLYgCAAAABAo2tU6n0Bb7bbbpaXacVeaTVbxNMBtnrrXVk2QAOje2Flllk/ORlmQdFU/9c8z43eWh1RNMpI3PscY+yDCnJPBQ==';

    let txe = StellarBase.xdr.TransactionEnvelope.fromXDR(
      xdr,
      'base64'
    ).value();
    let sourceAccount = txe.tx().sourceAccountEd25519();

    expect(sourceAccount.length).to.be.equal(32);
    done();
  });

  it('calculates correct hash with non-utf8 strings', function(done) {
    // a84d534b3742ad89413bdbf259e02fa4c5d039123769e9bcc63616f723a2bcd5
    let xdr =
      'AAAADBWheoe4LlAe+7qHTzO1YKan5UWXJcfm0lWUNHqhTmyyA+XiKtbbwlzS8tW1CtjdBTYgPZrdjpjJuV5zcl7PZVQAAAAAXujVJAAAAAAAAAAANP1gT8iyDhlsxmyQcoP2Fniod7mVjT2BTMVtkcjtn0Wgqpv9/HAz1qv3tHX358U3J8v/ft01KU1czAlKoGDFNQBgpwMAI4byb8EAAAAAAACJHeRgAAAAAAAAAAAAAAZhAADDUABMS0AAAAPog9syLpVvCsPfN31b22TfKiyG534TEFrxEghraQKQGTSuAj4KfMUigmu1l3k5dBaUB8NvVSnHLEgnA3/oU+QLaRWGmADZ9POhjNpc3qw20WsJUlORcwbrvCeQvODnlw2uRiJzcGSGYQLqV5qdBgsME1k1p2LB2Tkpi/8odwrQ5doAAAAA';
    var tx = new StellarBase.Transaction(xdr, StellarBase.Networks.PUBLIC);
    expect(tx.hash().toString('hex')).to.be.equal(
      'c27ba8968f29c7e684b7a5947f452100bb610996402b5cc75304180b07583248'
    );
    done();
  });
});
