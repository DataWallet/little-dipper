# Little Dipper

Is a meteor package implementing the blockchain parsing concepts first implemented in the [Big Dipper]() block explorer software.

## Objectives

The objective behind `little-dipper` is to abstract the blockchain partsing methods from the specific software application, allowing for more easily customization, as well as more able to be adapted to customized implementations of blockchain applicaitons using the Cosmos-sdk.

Secondly, this abstraction also will allow for more refactoring of the blockchain parser (or "ETL", although it is probably more appropriately defined as "ETS" or "Extract, Transform, Store"), and allow for configuration support or disabling of core Cosmos modules, as well as definitions for custom modules.


