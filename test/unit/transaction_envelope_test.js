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
      'AAAAAGrBcoiY+krPnNbGOJTsJ+Kuu8d+ozGdmwMQX4q6mP73AADDUAA8MUwAAAASAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAcGDfc3KZWZGw+Fk9yO4Qs/IVvjXRVJ1Xk7KeoU97w8AAAAAAAAAAAAL68IAAAAAAAAAAAA==';
    var tx = new StellarBase.Transaction(xdr, StellarBase.Networks.PUBLIC);
    expect(tx.hash().toString('hex')).to.be.equal(
      'e11d681a6d14d92e31346ec0166aafc518934b3b267480af56586bf0e094a479'
    );
    done();
  });
});
