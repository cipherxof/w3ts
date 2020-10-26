/** @noSelfInFile **/

import { Destructable } from "./destructable";
import { Force } from "./force";
import { Group } from "./group";
import { Handle } from "./handle";
import { Item } from "./item";
import { MapPlayer } from "./player";
import { Point } from "./point";
import { Sound } from "./sound";
import { Widget } from "./widget";

export class Unit extends Widget {

  public readonly handle!: unit;

  /**
   * Creates a new unit for the given player and places it in the map at the given position.
   * 
   * @param owner owner (player)
   * @param unitId id of the unit to create (for example: `FourCC('hrif')` to create a Rifleman)
   * @param x position on the X-Axis for the unit
   * @param y position on the Y-Axis for the unit
   * @param face unit facing angle (min. `0.00` max `360.00`)
   * @param skinId optional id of the skin for the unit
   */
  constructor(owner: MapPlayer | number, unitId: number, x: number, y: number, face: number, skinId?: number) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      const p = typeof owner === "number" ? Player(owner) : owner.handle;
      super(skinId ? BlzCreateUnitWithSkin(p, unitId, x, y, face, skinId) : CreateUnit(p, unitId, x, y, face));
    }
  }

  /**
   * Set the range at which a unit/building/hero will automatically look for targets, and move or attack the target as necessary. 
   * 
   * Note that the attacking range of a unit/building/hero can never be greater 
   * than its acquisition range (see Unit Editor field `Combat - Attack x - Range`).
   */
  public set acquireRange(value: number) {
    SetUnitAcquireRange(this.handle, value);
  }

  /**
   * Get the range at which a unit/building/hero will automatically look for targets, and move or attack the target as necessary.
   */
  public get acquireRange() {
    return GetUnitPropWindow(this.handle);
  }

  /**
   * Retrieves the value of the hero's baseline agility (excluding bonuses).
   */
  public get agility() {
    return GetHeroAgi(this.handle, false);
  }

  /**
   * Defines the value of the hero's agility.
   * @todo unsure how this behaves in relation to agility gains per level (will they be erased?)
   */
  public set agility(value: number) {
    SetHeroAgi(this.handle, value, true);
  }

  /**
   * Retrieves the armor amount for this unit.
   * @todo unsure if this includes bonuses by research, auras, etc
   */
  public get armor() {
    return BlzGetUnitArmor(this.handle);
  }

  /**
   * Defines a new armor amount for this unit.
   * @todo will research, auras, etc still apply after setting this?
   */
  public set armor(armorAmount: number) {
    BlzSetUnitArmor(this.handle, armorAmount);
  }

  /**
   * Defines whether the unit/hero sleeps at night-time. Only affects units or heroes owned by the Neutral Hostile player.
   */
  public set canSleep(flag: boolean) {
    UnitAddSleep(this.handle, flag);
  }

  /**
   * Defines whether the unit/hero sleeps at night-time.
   */
  public get canSleep() {
    return UnitCanSleep(this.handle);
  }

  /**
   * Defines how large an area the unit/building/hero physically occupies on a map, 
   * and consequently how well it is able to manoeuvre around other objects on a map (and vice versa).
   * @todo make sure that, as there is no setter for this (and seemingly no other way to modify the collisionSize), this is indeed not modifiable
   */
  public get collisionSize() {
    return BlzGetUnitCollisionSize(this.handle);
  }

  /**
   * Defines what team color the unit/building/hero is to have. 
   * This field will only work if the Unit Editor field "Art - Allow Custom Team Color" has been set to "True".
   * @todo make sure the assumption about the editor field is still true
   */
  public set color(whichColor: playercolor) {
    SetUnitColor(this.handle, whichColor);
  }

  /**
   * Returns the id of the order the unit currently has.
   * @todo what does it return if there is no order?
   */
  public get currentOrder() {
    return GetUnitCurrentOrder(this.handle);
  }

  /**
   * Returns the **original** range at which the unit will automatically look for targets, and move or attack the target as necessary. 
   * Note that the attacking range of a unit can never be greater than its acquisition range (see Unit Editor field `Combat - Attack x - Range`)
   */
  public get defaultAcquireRange() {
    return GetUnitDefaultAcquireRange(this.handle);
  }

  public get defaultFlyHeight() {
    return GetUnitDefaultFlyHeight(this.handle);
  }

  public get defaultMoveSpeed() {
    return GetUnitDefaultMoveSpeed(this.handle);
  }

  public get defaultPropWindow() {
    return GetUnitDefaultPropWindow(this.handle);
  }

  public get defaultTurnSpeed() {
    return GetUnitDefaultTurnSpeed(this.handle);
  }

  /**
   * The EXP of a hero unit.
   */
  public get experience() {
    return GetHeroXP(this.handle);
  }

  /**
   * Sets the exp of a hero to a number. 
   * Won't go over the EXP cap that heros have. 
   * Automatically gains skill points if a level up is achieved and shows the Level-Up FX. 
   */
  public set experience(newXpVal: number) {
    SetHeroXP(this.handle, newXpVal, true);
  }

  /**
   * Make the unit face the given angle (min: `0.00`, max: `360.00`)
   */
  public set facing(value: number) {
    SetUnitFacing(this.handle, value);
  }

  /**
   * Retrieves the angle the unit is currently facing (min: `0.00`, max: `360.00`)
   */
  public get facing() {
    return GetUnitFacing(this.handle);
  }

  /**
   * Defines the amount of food resources the unit produces. 
   * 
   * The food cap can be modified by editing the field "Food Limit" in Gameplay Constants, 
   * or by using the trigger actions `Player - Set Property` and `Player - Add Property`.
   */
  public get foodMade() {
    return GetUnitFoodMade(this.handle);
  }

  /**
   * Defines the amount of food resources the unit consumes. 
   * The food cap can be modified by editing the field "Food Limit" in Gameplay Constants, 
   * or by using the trigger actions `Player - Set Property` and `Player - Add Property`.
   */
  public get foodUsed() {
    return GetUnitFoodUsed(this.handle);
  }

  public get ignoreAlarmToggled() {
    return UnitIgnoreAlarmToggled(this.handle);
  }

  /**
   * Retrieves the value of the hero's baseline intelligence (excluding bonuses).
   */
  public get intelligence() {
    return GetHeroInt(this.handle, false);
  }

  /**
   * Defines the value of the hero's intelligence.
   * @todo unsure how this behaves in relation to agility gains per level (will they be erased?)
   */
  public set intelligence(value: number) {
    SetHeroInt(this.handle, value, true);
  }

  /**
   * Retrieves the size of a unit's inventory.
   * @todo This should be a range of 0-6, right?
   */
  public get inventorySize() {
    return UnitInventorySize(this.handle);
  }

  /**
   * Controls the invulnerability of the unit.
   */
  public set invulnerable(flag: boolean) {
    SetUnitInvulnerable(this.handle, flag);
  }

  /**
   * Retrieves the invulnerability of the unit.
   */
  public get invulnerable() {
    return BlzIsUnitInvulnerable(this.handle);
  }

  /**
   * Defines the level of the unit/building/hero. 
   * The values entered can range from `1 to `100`, and determine the amount of experience points given to a hero who kills another unit/building/hero.
   */
  public get level() {
    return GetUnitLevel(this.handle);
  }

  public get localZ() {
    return BlzGetLocalUnitZ(this.handle);
  }

  /**
   * Get the current mana value.
   */
  public get mana() {
    return this.getState(UNIT_STATE_MANA);
  }

  /**
   * Set the current mana value.
   * This should not be greater than maxMana.
   */
  public set mana(value: number) {
    this.setState(UNIT_STATE_MANA, value);
  }

  /**
   * Get the maximum hit points of this unit.
   */
  public get maxLife() {
    return BlzGetUnitMaxHP(this.handle);
  }

  /**
   * Set the maximum hit points for this unit.
   */
  public set maxLife(value: number) {
    BlzSetUnitMaxHP(this.handle, value);
  }

  /**
   * Get the maximum mana points for this unit.
   */
  public get maxMana() {
    return BlzGetUnitMaxMana(this.handle);
  }

  /**
   * Set the maximum mana points for this unit.
   */
  public set maxMana(value: number) {
    BlzSetUnitMaxMana(this.handle, value);
  }

  public set moveSpeed(value: number) {
    SetUnitMoveSpeed(this.handle, value);
  }

  public get moveSpeed() {
    return GetUnitMoveSpeed(this.handle);
  }

  /**
   * Get the name of this unit.
   * A field used purely within the editor, defining the name of the unit/building/hero.
   */
  get name() {
    return GetUnitName(this.handle);
  }

  /**
   * Set the name of this unit.
   * A field used purely within the editor, defining the name of the unit/building/hero.
   */
  set name(value: string) {
    BlzSetUnitName(this.handle, value);
  }

  /**
   * Set the "proper" name of this hero unit.
   * This is not the regular unit name but the one only heroes have.
   */
  public set nameProper(value: string) {
    BlzSetHeroProperName(this.handle, value);
  }

  /**
   * Get the "proper" name of this hero unit.
   * This is not the regular unit name but the one only heroes have.
   */
  public get nameProper() {
    return GetHeroProperName(this.handle);
  }

  /**
   * Change the owning player of this unit.
   */
  public set owner(whichPlayer: MapPlayer) {
    SetUnitOwner(this.handle, whichPlayer.handle, true);
  }

  /**
   * Get the owning player of this unit.
   */
  public get owner() {
    return MapPlayer.fromHandle(GetOwningPlayer(this.handle));
  }

  /**
   * Control the pause state of this unit.
   * 
   * Pause stops a unit dead in it's tracks, it is kinda like hibernate mode. 
   * It remembers it's orders and when it is unpaused it goes back to them.
   */
  public set paused(flag: boolean) {
    PauseUnit(this.handle, flag);
  }

  /**
   * Get the pause state of this unit.
   */
  public get paused() {
    return IsUnitPaused(this.handle);
  }

  /**
   * Get the point where this unit is located.
   */
  public get point() {
    return Point.fromHandle(GetUnitLoc(this.handle));
  }

  /**
   * Relocate this unit to the given point.
   */
  public set point(whichPoint: Point) {
    SetUnitPositionLoc(this.handle, whichPoint.handle);
  }

  /**
   * Get the current point value of this unit.
   * 
   * Has no significance in the game other than to be used as part of a trigger 
   * through the Integer functions `Unit - Point value of Unit` and `Unit - Point value of Unit-type`.
   */
  public get pointValue() {
    return GetUnitPointValue(this.handle);
  }

  public set propWindow(value: number) {
    SetUnitPropWindow(this.handle, value);
  }

  public get propWindow() {
    return GetUnitAcquireRange(this.handle);
  }

  /**
   * Get the race to which the unit belongs.
   */
  public get race() {
    return GetUnitRace(this.handle);
  }

  public get rallyDestructable() {
    return Destructable.fromHandle(GetUnitRallyDestructable(this.handle));
  }

  public get rallyPoint() {
    return Point.fromHandle(GetUnitRallyPoint(this.handle));
  }

  public get rallyUnit() {
    return Unit.fromHandle(GetUnitRallyUnit(this.handle));
  }

  public set resourceAmount(amount: number) {
    SetResourceAmount(this.handle, amount);
  }

  public get resourceAmount() {
    return GetResourceAmount(this.handle);
  }

  public get selectable() {
    return BlzIsUnitSelectable(this.handle);
  }

  /**
   * Controls the size of the unit's selection circle.
   * Min: `0.000` Max: `20.000`
   */
  public set selectionScale(scale: number) {
    this.setField(UNIT_RF_SELECTION_SCALE, scale);
  }

  /**
   * Defines the size of the unit's selection circle.
   */
  public get selectionScale() {
    const result = this.getField(UNIT_RF_SELECTION_SCALE);
    return typeof result === "number" ? result : 0;
  }

  /**
   * Renders the unit invisible² and unable to participate in most situations. 
   * Good if you want a pre-made unit to appear out of seemingly nowhere.
   * 
   * ² Unlike giving the unit the permanent invisibility ability, a unit hidden this way
   *   can't be detected by the usual means of detecting invisibility.
   * 
   * @todo Further clarify how the invisibility differs from the regular one:
   *  - can it take damage inflicted by other units?
   *  - can it be picked up by unit groups?
   *  - can it move?
   */
  public set show(flag: boolean) {
    ShowUnit(this.handle, flag);
  }

  /**
   * Returns whether the unit is currently hidden or not.
   * 
   * Cannot detect regular invisibility.
   */
  public get show() {
    return IsUnitHidden(this.handle);
  }

  public get skin() {
    return BlzGetUnitSkin(this.handle);
  }

  public set skin(skinId: number) {
    BlzSetUnitSkin(this.handle, skinId);
  }

  public get skillPoints() {
    return GetHeroSkillPoints(this.handle);
  }

  public set skillPoints(skillPointDelta: number) {
    UnitModifySkillPoints(this.handle, skillPointDelta);
  }

  public get sleeping() {
    return UnitIsSleeping(this.handle);
  }

  public get strength() {
    return GetHeroStr(this.handle, false);
  }

  public set strength(value: number) {
    SetHeroStr(this.handle, value, true);
  }

  /**
   * Defines the speed at which the unit/building/hero is allowed to turn. 
   * 
   * Turn speed can only be affected by certain spells, and by the trigger action `Animation - Change Unit Turn Speed`. 
   * Turn speed values range between 0 and 1, with 1 being the fastest turn speed possible.
   */
  public set turnSpeed(value: number) {
    SetUnitTurnSpeed(this.handle, value);
  }

  /**
   * Defines the speed at which the unit/building/hero is allowed to turn.
   */
  public get turnSpeed() {
    return GetUnitTurnSpeed(this.handle);
  }

  public get typeId() {
    return GetUnitTypeId(this.handle);
  }

  public get userData() {
    return GetUnitUserData(this.handle);
  }

  public set userData(value: number) {
    SetUnitUserData(this.handle, value);
  }

  public set waygateActive(flag: boolean) {
    WaygateActivate(this.handle, flag);
  }

  public get waygateActive() {
    return WaygateIsActive(this.handle);
  }

  public get x() {
    return GetUnitX(this.handle);
  }

  public set x(value: number) {
    SetUnitX(this.handle, value);
  }

  public get y() {
    return GetUnitY(this.handle);
  }

  public set y(value: number) {
    SetUnitY(this.handle, value);
  }

  public get z() {
    return BlzGetUnitZ(this.handle);
  }

  /**
   * Adds an ability to this unit.
   * @param abilityId id of the ability to add
   */
  public addAbility(abilityId: number) {
    return UnitAddAbility(this.handle, abilityId);
  }

  public addAnimationProps(animProperties: string, add: boolean) {
    AddUnitAnimationProperties(this.handle, animProperties, add);
  }

  /**
   * Adds XP to this hero while deciding whether or not to display the Level-Up fx.
   * @param xpToAdd amount of XP to add
   * @param showEyeCandy whether or not to display the Level-Up fx
   */
  public addExperience(xpToAdd: number, showEyeCandy: boolean) {
    AddHeroXP(this.handle, xpToAdd, showEyeCandy);
  }

  public addIndicator(red: number, blue: number, green: number, alpha: number, ) {
    UnitAddIndicator(this.handle, red, blue, green, alpha);
  }

  /**
   * Adds the given item to the unit's inventory (if possible).
   * @param whichItem item to add
   */
  public addItem(whichItem: Item) {
    return UnitAddItem(this.handle, whichItem.handle);
  }

  /**
   * Adds the given item, identified by id, to the unit's inventory (if possible).
   * @param itemId id of item to add
   */
  public addItemById(itemId: number) {
    return UnitAddItemById(this.handle, itemId);
  }

  /**
   * Adds the given item, identified by id, to the given inventory slot (if possible).
   * @param itemId id of item to add
   * @param itemSlot number of the slot
   */
  public addItemToSlotById(itemId: number, itemSlot: number) {
    return UnitAddItemToSlotById(this.handle, itemId, itemSlot);
  }

  /**
   * Adds the given item, identified by id, to the stock of this unit.
   * @param itemId id of item to add
   * @param currentStock amount of items available right away
   * @param stockMax maximum amount of items that can be available
   */
  public addItemToStock(itemId: number, currentStock: number, stockMax: number) {
    AddItemToStock(this.handle, itemId, currentStock, stockMax);
  }

  public addResourceAmount(amount: number) {
    AddResourceAmount(this.handle, amount);
  }

  public addSleepPerm(add: boolean) {
    UnitAddSleepPerm(this.handle, add);
  }

  /**
   * @todo what is this, Target Types?
   */
  public addType(whichUnitType: unittype) {
    return UnitAddType(this.handle, whichUnitType);
  }

  /**
   * Adds the given unit, identified by id, to the stock of this unit.
   * @param unitId id of the unit to add to stock
   * @param currentStock amount of units available right away
   * @param stockMax maximum amount of units that can be available
   */
  public addUnitToStock(unitId: number, currentStock: number, stockMax: number) {
    AddUnitToStock(this.handle, unitId, currentStock, stockMax);
  }

  /**
   * Applies an expiration timer (read: death sentence) to this unit.
   * @param buffId id of the expiration type ( @todo possible values?)
   * @param duration time to live
   */
  public applyTimedLife(buffId: number, duration: number) {
    UnitApplyTimedLife(this.handle, buffId, duration);
  }

  public attachSound(sound: Sound) {
    AttachSoundToUnit(sound.handle, this.handle);
  }

  /**
   * Removes a previously created expiration timer from this unit.
   */
  public cancelTimedLife() {
    BlzUnitCancelTimedLife(this.handle);
  }

  public canSleepPerm() {
    return UnitCanSleepPerm(this.handle);
  }

  public countBuffs(removePositive: boolean, removeNegative: boolean, magic: boolean, physical: boolean, timedLife: boolean, aura: boolean, autoDispel: boolean) {
    return UnitCountBuffsEx(this.handle, removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
  }

  /**
   * Inflict damage caused by this unit at the given point.
   * @param delay @todo what resolution does this field have, probably milliseconds?
   * @param radius area of effect of the damage application
   * @param x position on the X-Axis
   * @param y position on the Y-Axis
   * @param amount amount of damage
   * @param attack @todo what does this mean?
   * @param ranged whether this is a ranged or melee attack
   * @param attackType type of the attack
   * @param damageType type of the damage that will be applied
   * @param weaponType type of the weapon that will be used
   */
  public damageAt(delay: number, radius: number, x: number, y: number, amount: number, attack: boolean, ranged: boolean, attackType: attacktype, damageType: damagetype, weaponType: weapontype) {
    return UnitDamagePoint(this.handle, delay, radius, x, y, amount, attack, ranged, attackType, damageType, weaponType);
  }

  /**
   * Inflict damage caused by this unit to the given target.
   * @param target target that will take damage
   * @param amount amount of damage
   * @param radius area of effect of the damage application
   * @param attack @todo what does this mean?
   * @param ranged whether this is a ranged or melee attack
   * @param attackType type of the attack
   * @param damageType type of the damage that will be applied
   * @param weaponType type of the weapon that will be used
   */
  public damageTarget(target: widget, amount: number, radius: number, attack: boolean, ranged: boolean, attackType: attacktype, damageType: damagetype, weaponType: weapontype) {
    return UnitDamageTarget(this.handle, target, amount, attack, ranged, attackType, damageType, weaponType);
  }

  public decAbilityLevel(abilCode: number) {
    return DecUnitAbilityLevel(this.handle, abilCode);
  }

  public destroy() {
    RemoveUnit(this.handle);
  }

  public disableAbility(abilId: number, flag: boolean, hideUI: boolean) {
    BlzUnitHideAbility(this.handle, abilId, flag);
  }

  public dropItem(whichItem: Item, x: number, y: number) {
    return UnitDropItemPoint(this.handle, whichItem.handle, x, y);
  }

  public dropItemFromSlot(whichItem: Item, slot: number) {
    return UnitDropItemSlot(this.handle, whichItem.handle, slot);
  }

  public dropItemTarget(whichItem: Item, target: Widget/* | Unit | Item | Destructable*/) {
    return UnitDropItemTarget(this.handle, whichItem.handle, target.handle);
  }

  public endAbilityCooldown(abilCode: number) {
    BlzEndUnitAbilityCooldown(this.handle, abilCode);
  }

  public getAbility(abilId: number) {
    return BlzGetUnitAbility(this.handle, abilId);
  }

  public getAbilityByIndex(index: number) {
    return BlzGetUnitAbilityByIndex(this.handle, index);
  }

  public getAbilityCooldown(abilId: number, level: number) {
    return BlzGetUnitAbilityCooldown(this.handle, abilId, level);
  }

  public getAbilityCooldownRemaining(abilId: number, level: number) {
    return BlzGetUnitAbilityCooldownRemaining(this.handle, abilId);
  }

  public getAbilityLevel(abilCode: number) {
    return GetUnitAbilityLevel(this.handle, abilCode);
  }

  public getAbilityManaCost(abilId: number, level: number) {
    return BlzGetUnitAbilityManaCost(this.handle, abilId, level);
  }

  public getAgility(includeBonuses: boolean) {
    return GetHeroAgi(this.handle, includeBonuses);
  }

  public getAttackCooldown(weaponIndex: number) {
    return BlzGetUnitAttackCooldown(this.handle, weaponIndex);
  }

  public getBaseDamage(weaponIndex: number) {
    return BlzGetUnitBaseDamage(this.handle, weaponIndex);
  }

  public getDiceNumber(weaponIndex: number) {
    return BlzGetUnitDiceNumber(this.handle, weaponIndex);
  }

  public getDiceSides(weaponIndex: number) {
    return BlzGetUnitDiceSides(this.handle, weaponIndex);
  }

  public getField(field: unitbooleanfield | unitintegerfield | unitrealfield | unitstringfield) {
    const fieldType = field.toString().substr(0, field.toString().indexOf(":"));

    switch (fieldType) {
      case "unitbooleanfield":
        const fieldBool: unitbooleanfield = field as unitbooleanfield;

        return BlzGetUnitBooleanField(this.handle, fieldBool);
      case "unitintegerfield":
        const fieldInt: unitintegerfield = field as unitintegerfield;

        return BlzGetUnitIntegerField(this.handle, fieldInt);
      case "unitrealfield":
        const fieldReal: unitrealfield = field as unitrealfield;

        return BlzGetUnitRealField(this.handle, fieldReal);
      case "unitstringfield":
        const fieldString: unitstringfield = field as unitstringfield;

        return BlzGetUnitStringField(this.handle, fieldString);
      default:
        return 0;
    }
  }

  public getflyHeight() {
    return GetUnitFlyHeight(this.handle);
  }

  public getHeroLevel() {
    return GetHeroLevel(this.handle);
  }

  public getIgnoreAlarm(flag: boolean) {
    return UnitIgnoreAlarm(this.handle, flag);
  }

  public getIntelligence(includeBonuses: boolean) {
    return GetHeroInt(this.handle, includeBonuses);
  }

  public getItemInSlot(slot: number) {
    return UnitItemInSlot(this.handle, slot);
  }

  public getState(whichUnitState: unitstate) {
    return GetUnitState(this.handle, whichUnitState);
  }

  public getStrength(includeBonuses: boolean) {
    return GetHeroStr(this.handle, includeBonuses);
  }

  public hasBuffs(removePositive: boolean, removeNegative: boolean, magic: boolean, physical: boolean, timedLife: boolean, aura: boolean, autoDispel: boolean) {
    return UnitHasBuffsEx(this.handle, removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
  }

  public hasItem(whichItem: Item) {
    return UnitHasItem(this.handle, whichItem.handle);
  }

  public hideAbility(abilId: number, flag: boolean) {
    BlzUnitHideAbility(this.handle, abilId, flag);
  }

  public incAbilityLevel(abilCode: number) {
    return IncUnitAbilityLevel(this.handle, abilCode);
  }

  public inForce(whichForce: Force) {
    return IsUnitInForce(this.handle, whichForce.handle);
  }

  public inGroup(whichGroup: Group) {
    return IsUnitInGroup(this.handle, whichGroup.handle);
  }

  public inRange(x: number, y: number, distance: number) {
    return IsUnitInRangeXY(this.handle, x, y, distance);
  }

  public inRangeOfPoint(whichPoint: Point, distance: number) {
    return IsUnitInRangeLoc(this.handle, whichPoint.handle, distance);
  }

  public inRangeOfUnit(otherUnit: Unit, distance: number) {
    return IsUnitInRange(this.handle, otherUnit.handle, distance);
  }

  public interruptAttack() {
    BlzUnitInterruptAttack(this.handle);
  }

  public inTransport(whichTransport: Unit) {
    return IsUnitInTransport(this.handle, whichTransport.handle);
  }

  public isAlive(): boolean {
    return UnitAlive(this.handle);
  }

  public isAlly(whichPlayer: MapPlayer) {
    return IsUnitAlly(this.handle, whichPlayer.handle);
  }

  public isEnemy(whichPlayer: MapPlayer) {
    return IsUnitEnemy(this.handle, whichPlayer.handle);
  }

  public isExperienceSuspended() {
    return IsSuspendedXP(this.handle);
  }

  public isFogged(whichPlayer: MapPlayer) {
    return IsUnitFogged(this.handle, whichPlayer.handle);
  }

  public isHero() {
    return IsHeroUnitId(this.typeId);
  }

  public isIllusion() {
    return IsUnitIllusion(this.handle);
  }

  public isLoaded() {
    return IsUnitLoaded(this.handle);
  }

  public isMasked(whichPlayer: MapPlayer) {
    return IsUnitMasked(this.handle, whichPlayer.handle);
  }

  public isSelected(whichPlayer: MapPlayer) {
    return IsUnitSelected(this.handle, whichPlayer.handle);
  }

  public issueBuildOrder(unit: string | number, x: number, y: number) {
    return typeof unit === "string" ? IssueBuildOrder(this.handle, unit, x, y) : IssueBuildOrderById(this.handle, unit, x, y);
  }

  public issueImmediateOrder(order: string | number) {
    return typeof order === "string" ? IssueImmediateOrder(this.handle, order) : IssueImmediateOrderById(this.handle, order);
  }

  public issueInstantOrderAt(order: string | number, x: number, y: number, instantTargetWidget: Widget) {
    return typeof order === "string" ? IssueInstantPointOrder(this.handle, order, x, y, instantTargetWidget.handle) : IssueInstantPointOrderById(this.handle, order, x, y, instantTargetWidget.handle);
  }

  public issueInstantTargetOrder(order: string | number, targetWidget: Widget, instantTargetWidget: Widget) {
    return typeof order === "string" ? IssueInstantTargetOrder(this.handle, order, targetWidget.handle, instantTargetWidget.handle) : IssueInstantTargetOrderById(this.handle, order, targetWidget.handle, instantTargetWidget.handle);
  }

  public issueOrderAt(order: string | number, x: number, y: number) {
    return typeof order === "string" ? IssuePointOrder(this.handle, order, x, y) : IssuePointOrderById(this.handle, order, x, y);
  }

  public issuePointOrder(order: string | number, whichPoint: Point) {
    return typeof order === "string" ? IssuePointOrderLoc(this.handle, order, whichPoint.handle) : IssuePointOrderByIdLoc(this.handle, order, whichPoint.handle);
  }

  public issueTargetOrder(order: string | number, targetWidget: Widget) {
    return typeof order === "string" ? IssueTargetOrder(this.handle, order, targetWidget.handle) : IssueTargetOrderById(this.handle, order, targetWidget.handle);
  }

  public isUnit(whichSpecifiedUnit: Unit) {
    return IsUnit(this.handle, whichSpecifiedUnit.handle);
  }

  public isUnitType(whichUnitType: unittype) {
    return IsUnitType(this.handle, whichUnitType);
  }

  public isVisible(whichPlayer: MapPlayer) {
    return IsUnitVisible(this.handle, whichPlayer.handle);
  }

  public kill() {
    KillUnit(this.handle);
  }

  public lookAt(whichBone: string, lookAtTarget: Unit, offsetX: number, offsetY: number, offsetZ: number) {
    SetUnitLookAt(this.handle, whichBone, lookAtTarget.handle, offsetX, offsetY, offsetZ);
  }

  public makeAbilityPermanent(permanent: boolean, abilityId: number) {
    UnitMakeAbilityPermanent(this.handle, permanent, abilityId);
  }

  public modifySkillPoints(skillPointDelta: number) {
    return UnitModifySkillPoints(this.handle, skillPointDelta);
  }

  public pauseEx(flag: boolean) {
    BlzPauseUnitEx(this.handle, flag);
  }

  public pauseTimedLife(flag: boolean) {
    UnitPauseTimedLife(this.handle, flag);
  }

  public queueAnimation(whichAnimation: string) {
    QueueUnitAnimation(this.handle, whichAnimation);
  }

  public recycleGuardPosition() {
    RecycleGuardPosition(this.handle);
  }

  public removeAbility(abilityId: number) {
    return UnitRemoveAbility(this.handle, abilityId);
  }

  public removeBuffs(removePositive: boolean, removeNegative: boolean) {
    UnitRemoveBuffs(this.handle, removePositive, removeNegative);
  }

  public removeBuffsEx(removePositive: boolean, removeNegative: boolean, magic: boolean, physical: boolean, timedLife: boolean, aura: boolean, autoDispel: boolean) {
    UnitRemoveBuffsEx(this.handle, removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
  }

  public removeGuardPosition() {
    RemoveGuardPosition(this.handle);
  }

  public removeItem(whichItem: Item) {
    UnitRemoveItem(this.handle, whichItem.handle);
  }

  public removeItemFromSlot(itemSlot: number) {
    return UnitRemoveItemFromSlot(this.handle, itemSlot);
  }

  public removeItemFromStock(itemId: number) {
    RemoveItemFromStock(this.handle, itemId);
  }

  public removeType(whichUnitType: unittype) {
    return UnitAddType(this.handle, whichUnitType);
  }

  public removeUnitFromStock(itemId: number) {
    RemoveUnitFromStock(this.handle, itemId);
  }

  public resetCooldown() {
    UnitResetCooldown(this.handle);
  }

  public resetLookAt() {
    ResetUnitLookAt(this.handle);
  }

  public revive(x: number, y: number, doEyecandy: boolean) {
    return ReviveHero(this.handle, x, y, doEyecandy);
  }

  public reviveAtPoint(whichPoint: Point, doEyecandy: boolean) {
    return ReviveHeroLoc(this.handle, whichPoint.handle, doEyecandy);
  }

  public select(flag: boolean) {
    SelectUnit(this.handle, flag);
  }

  public selectSkill(abilCode: number) {
    SelectHeroSkill(this.handle, abilCode);
  }

  public setAbilityCooldown(abilId: number, level: number, cooldown: number) {
    BlzSetUnitAbilityCooldown(this.handle, abilId, level, cooldown);
  }

  public setAbilityLevel(abilCode: number, level: number) {
    return SetUnitAbilityLevel(this.handle, abilCode, level);
  }

  public setAbilityManaCost(abilId: number, level: number, manaCost: number) {
    BlzSetUnitAbilityManaCost(this.handle, abilId, level, manaCost);
  }

  public setAgility(value: number, permanent: boolean) {
    SetHeroAgi(this.handle, value, permanent);
  }

  public setAnimation(whichAnimation: string | number) {
    if (typeof whichAnimation === "string") {
      SetUnitAnimation(this.handle, whichAnimation);
    } else {
      SetUnitAnimationByIndex(this.handle, whichAnimation);
    }
  }

  public setAnimationWithRarity(whichAnimation: string, rarity: raritycontrol) {
    SetUnitAnimationWithRarity(this.handle, whichAnimation, rarity);
  }

  public setAttackCooldown(cooldown: number, weaponIndex: number) {
    BlzSetUnitAttackCooldown(this.handle, cooldown, weaponIndex);
  }

  public setBaseDamage(baseDamage: number, weaponIndex: number) {
    BlzSetUnitBaseDamage(this.handle, baseDamage, weaponIndex);
  }

  public setBlendTime(timeScale: number) {
    SetUnitBlendTime(this.handle, timeScale);
  }

  public setConstructionProgress(constructionPercentage: number) {
    UnitSetConstructionProgress(this.handle, constructionPercentage);
  }

  public setCreepGuard(creepGuard: boolean) {
    SetUnitCreepGuard(this.handle, creepGuard);
  }

  public setDiceNumber(diceNumber: number, weaponIndex: number) {
    BlzSetUnitDiceNumber(this.handle, diceNumber, weaponIndex);
  }

  public setDiceSides(diceSides: number, weaponIndex: number) {
    BlzSetUnitDiceSides(this.handle, diceSides, weaponIndex);
  }

  public setExperience(newXpVal: number, showEyeCandy: boolean) {
    SetHeroXP(this.handle, newXpVal, showEyeCandy);
  }

  public setExploded(exploded: boolean) {
    SetUnitExploded(this.handle, exploded);
  }

  public setFacingEx(facingAngle: number) {
    BlzSetUnitFacingEx(this.handle, facingAngle);
  }

  public setField(field: unitbooleanfield | unitintegerfield | unitrealfield | unitstringfield, value: boolean | number | string) {
    const fieldType = field.toString().substr(0, field.toString().indexOf(":"));

    if (fieldType === "unitbooleanfield" && typeof value === "boolean") {
      return BlzSetUnitBooleanField(this.handle, field as unitbooleanfield, value);
    } else if (fieldType === "unitintegerfield" && typeof value === "number") {
      return BlzSetUnitIntegerField(this.handle, field as unitintegerfield, value);
    } else if (fieldType === "unitrealfield" && typeof value === "number") {
      return BlzSetUnitRealField(this.handle, field as unitrealfield, value);
    } else if (fieldType === "unitstringfield" && typeof value === "string") {
      return BlzSetUnitStringField(this.handle, field as unitstringfield, value);
    }

    return false;
  }

  public setflyHeight(value: number, rate: number) {
    SetUnitFlyHeight(this.handle, value, rate);
  }

  public setHeroLevel(level: number, showEyeCandy: boolean) {
    SetHeroLevel(this.handle, level, showEyeCandy);
  }

  public setIntelligence(value: number, permanent: boolean) {
    SetHeroInt(this.handle, value, permanent);
  }

  public setItemTypeSlots(slots: number) {
    SetItemTypeSlots(this.handle, slots);
  }

  public setOwner(whichPlayer: MapPlayer, changeColor: boolean) {
    SetUnitOwner(this.handle, whichPlayer.handle, changeColor);
  }

  public setPathing(flag: boolean) {
    SetUnitPathing(this.handle, flag);
  }

  public setPosition(x: number, y: number) {
    SetUnitPosition(this.handle, x, y);
  }

  public setRescuable(byWhichPlayer: MapPlayer, flag: boolean) {
    SetUnitRescuable(this.handle, byWhichPlayer.handle, flag);
  }

  public setRescueRange(range: number) {
    SetUnitRescueRange(this.handle, range);
  }

  public setScale(scaleX: number, scaleY: number, scaleZ: number) {
    SetUnitScale(this.handle, scaleX, scaleY, scaleZ);
  }

  public setState(whichUnitState: unitstate, newVal: number) {
    SetUnitState(this.handle, whichUnitState, newVal);
  }

  public setStrength(value: number, permanent: boolean) {
    SetHeroStr(this.handle, value, permanent);
  }

  public setTimeScale(timeScale: number) {
    SetUnitTimeScale(this.handle, timeScale);
  }

  public setUnitAttackCooldown(cooldown: number, weaponIndex: number) {
    BlzSetUnitAttackCooldown(this.handle, cooldown, weaponIndex);
  }

  public setUnitTypeSlots(slots: number) {
    SetUnitTypeSlots(this.handle, slots);
  }

  public setUpgradeProgress(upgradePercentage: number) {
    UnitSetUpgradeProgress(this.handle, upgradePercentage);
  }

  public setUseAltIcon(flag: boolean) {
    UnitSetUsesAltIcon(this.handle, flag);
  }

  public setUseFood(useFood: boolean) {
    SetUnitUseFood(this.handle, useFood);
  }

  public setVertexColor(red: number, green: number, blue: number, alpha: number) {
    SetUnitVertexColor(this.handle, red, green, blue, alpha);
  }

  public shareVision(whichPlayer: MapPlayer, share: boolean) {
    UnitShareVision(this.handle, whichPlayer.handle, share);
  }

  public showTeamGlow(show: boolean) {
    BlzShowUnitTeamGlow(this.handle, show);
  }

  public startAbilityCooldown(abilCode: number, cooldown: number) {
    BlzStartUnitAbilityCooldown(this.handle, abilCode, cooldown);
  }

  public stripLevels(howManyLevels: number) {
    return UnitStripHeroLevel(this.handle, howManyLevels);
  }

  public suspendDecay(suspend: boolean) {
    UnitSuspendDecay(this.handle, suspend);
  }

  public suspendExperience(flag: boolean) {
    SuspendHeroXP(this.handle, flag);
  }

  public useItem(whichItem: Item) {
    return UnitUseItem(this.handle, whichItem.handle);
  }

  public useItemAt(whichItem: Item, x: number, y: number) {
    return UnitUseItemPoint(this.handle, whichItem.handle, x, y);
  }

  public useItemTarget(whichItem: Item, target: Widget) {
    return UnitUseItemTarget(this.handle, whichItem.handle, target.handle);
  }

  public wakeUp() {
    UnitWakeUp(this.handle);
  }

  public waygateGetDestinationX() {
    return WaygateGetDestinationX(this.handle);
  }

  public waygateGetDestinationY() {
    return WaygateGetDestinationY(this.handle);
  }

  public waygateSetDestination(x: number, y: number) {
    WaygateSetDestination(this.handle, x, y);
  }

  public static foodMadeByType(unitId: number) {
    return GetFoodMade(unitId);
  }

  public static foodUsedByType(unitId: number) {
    return GetFoodUsed(unitId);
  }

  public static fromEvent() {
    return this.fromHandle(GetTriggerUnit());
  }

  public static fromHandle(handle: unit): Unit {
    return this.getObject(handle);
  }

  public static getPointValueByType(unitType: number) {
    return GetUnitPointValueByType(unitType);
  }

  public static isUnitIdHero(unitId: number) {
    return IsHeroUnitId(unitId);
  }

  public static isUnitIdType(unitId: number, whichUnitType: unittype) {
    return IsUnitIdType(unitId, whichUnitType);
  }
}
