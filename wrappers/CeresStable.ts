import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type CeresStableConfig = {};

export function ceresStableConfigToCell(config: CeresStableConfig): Cell {
    return beginCell().endCell();
}

export class CeresStable implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new CeresStable(address);
    }

    static createFromConfig(config: CeresStableConfig, code: Cell, workchain = 0) {
        const data = ceresStableConfigToCell(config);
        const init = { code, data };
        return new CeresStable(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
