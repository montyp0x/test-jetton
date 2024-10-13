import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { CeresStable } from '../wrappers/CeresStable';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('CeresStable', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('CeresStable');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let ceresStable: SandboxContract<CeresStable>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ceresStable = blockchain.openContract(CeresStable.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await ceresStable.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: ceresStable.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ceresStable are ready to use
    });
});
