import StagesModule from "~/scripts/modules/StagesModule"
import TimeModule from "~/scripts/modules/TimeModule"
import CalendarModule from "~/scripts/modules/CalendarModule"
import ReportModule from "~/scripts/modules/ReportModule"
import AchievementModule from "~/scripts/modules/AchievementModule"
import ResourcesModule from "~/scripts/modules/resources/ResourcesModule"
import CoalModule from "~/scripts/modules/resources/CoalModule"
import GoldModule from "~/scripts/modules/resources/GoldModule"
import PopulationModule from "~/scripts/modules/resources/PopulationModule"
import CraftingsModule from "~/scripts/modules/crafting/CraftingsModule"
import InventoryModule from "~/scripts/modules/resources/InventoryModule"
import MaterialsModule from "~/scripts/modules/resources/MaterialsModule"
import MinesModule from "~/scripts/modules/mines/MinesModule"
import NomadsModule from "~/scripts/modules/shop/NomadsModule"

/* 
  The player data variables object, which is also the piece that holds data to be persisted. 
*/

const properties = {
  debugMode: false,
  version: 1,

  saveDate: new Date(),

  amount: 1
}

/* -------------------------------------------------------------------------- */
/*                           The player general methods                       */
/* -------------------------------------------------------------------------- */

const methods = {
  // Change amount
  setAmount: function(v) {
    if (isNaN(v) === false && v > 0) {
      this.amount = v
    }
  }
}

// Construct the player object
const Player = {
  ...properties,
  ...methods,
  modules: {
    stages: StagesModule,
    time: TimeModule,
    calendar: CalendarModule,
    report: ReportModule,
    achievement: AchievementModule,
    craftings: CraftingsModule,
    mines: MinesModule,
    inventory: InventoryModule,
    materials: MaterialsModule,
    resources: ResourcesModule,
    population: PopulationModule,
    coal: CoalModule,
    gold: GoldModule,
    nomads: NomadsModule
  }
}

export default Player
