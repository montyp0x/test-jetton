import { toNano } from '@ton/core';
import { CeresStable } from '../wrappers/CeresStable';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const ceresStable = provider.open(CeresStable.createFromConfig({}, await compile('CeresStable')));

    await ceresStable.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(ceresStable.address);

    // run methods on `ceresStable`
}
