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
   * Creates a new unit for the given player at the given position.
   * 
   * @param owner owner (player)
   * @param unitId unit id (i.e. `FourCC('hrif')` for a Rifleman)
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
   * _(Note that the attacking range of a unit/building/hero can never be greater 
   * than its acquisition range (see Unit Editor field `Combat - Attack x - Range`).)_
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
   * 
   * _(Note that the attacking range of a unit can never be greater than its acquisition range (see Unit Editor field `Combat - Attack x - Range`))_
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
   * - Won't go over the EXP cap that heros have. 
   * - Automatically gains skill points if a level up is achieved and shows the Level-Up FX. 
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
   */
  public get foodMade() {
    return GetUnitFoodMade(this.handle);
  }

  /**
   * Defines the amount of food resources the unit consumes. 
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
   * Retrieves the level of the unit. 
   */
  public get level() {
    return GetUnitLevel(this.handle);
  }

  public get localZ() {
    return BlzGetLocalUnitZ(this.handle);
  }

  /**
   * Get the current amount of mana.
   */
  public get mana() {
    return this.getState(UNIT_STATE_MANA);
  }

  /**
   * Set the current amount of mana.
   * 
   * _(This should not be greater than maxMana.)_
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

  /**
   * Set the movement speed for this unit.
   * 
   * _(The gameplay constants `Movement - Unit Speed - Maximum/Minimum` represent the limits.)_
   */
  public set moveSpeed(value: number) {
    SetUnitMoveSpeed(this.handle, value);
  }

  /**
   * Get the movement speed for this unit.
   */
  public get moveSpeed() {
    return GetUnitMoveSpeed(this.handle);
  }

  /**
   * Get the name of this unit.
   */
  get name() {
    return GetUnitName(this.handle);
  }

  /**
   * Set the name of this unit.
   */
  set name(value: string) {
    BlzSetUnitName(this.handle, value);
  }

  /**
   * Set the "proper" name of this hero unit.
   * 
   * _(This is not the regular unit name but the one only heroes have._)
   */
  public set nameProper(value: string) {
    BlzSetHeroProperName(this.handle, value);
  }

  /**
   * Get the "proper" name of this hero unit.
   * 
   * _(This is not the regular unit name but the one only heroes have.)_
   */
  public get nameProper() {
    return GetHeroProperName(this.handle);
  }

  /**
   * Changes the owner of this unit.
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
   * Controls the pause state of this unit.
   * 
   * _Pause stops a unit dead in it's tracks, it is kind of like hibernate mode. 
   * It remembers it's orders and, when it is unpaused, goes back to them._
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
   * _Has no significance in the game other than to be used as part of a trigger_
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

  /**
   * Get the rally point of this unit.
   * 
   * _Most buildings able to train units have rally points that define where to send freshly trained units._
   */
  public get rallyPoint() {
    return Point.fromHandle(GetUnitRallyPoint(this.handle));
  }

  /**
   * Get the rally unit of this unit.
   * 
   * _A rally flag set to another unit instead of a point is required for this to work._
   */
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
   * Get the size of the unit's selection circle.
   */
  public get selectionScale() {
    const result = this.getField(UNIT_RF_SELECTION_SCALE);
    return typeof result === "number" ? result : 0;
  }

  /**
   * Hides the unit² and prevents participation in most situations. 
   * 
   * ² _Unlike giving the unit the permanent invisibility ability, a unit hidden this way
   *   can't be detected by the usual means of detecting invisibility._
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

  /**
   * Returns the units available skill points.
   */
  public get skillPoints() {
    return GetHeroSkillPoints(this.handle);
  }

  /**
   * Adds the amount to the units available skill points. Calling with a negative
   * number reduces the skill points by that amount.
   * Returns false if the amount of available skill points is already zero and
   * if it's called with any non-positive number.
   * Returns true in any other case.
   * @note If `skillPointDelta` is greater than the amount of skillpoints the hero
   * actually can spend (like 9 for three 3-level abilities) only that amount will
   * be added. Negative `skillPointDelta` works as expected.
   */
  public set skillPoints(skillPointDelta: number) {
    UnitModifySkillPoints(this.handle, skillPointDelta);
  }

  /**
   * Returns whether or not the unit is currently asleep.
   */
  public get sleeping() {
    return UnitIsSleeping(this.handle);
  }

  /**
   * Retrieves the current strength of the hero excluding bonuses.
   */
  public get strength() {
    return GetHeroStr(this.handle, false);
  }

  /**
   * Sets the strength of the hero permanently to the given value.
   */
  public set strength(value: number) {
    SetHeroStr(this.handle, value, true);
  }

  /**
   * Defines the speed at which the unit/building/hero is allowed to turn. 
   * @note Turn speed can only be affected by certain spells, and by the trigger action `Animation - Change Unit Turn Speed`. 
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

  /**
   * Retrieves the unit's type id.
   */
  public get typeId() {
    return GetUnitTypeId(this.handle);
  }

  /**
   * Retrieves a single, custom integer for a unit.
   */
  public get userData() {
    return GetUnitUserData(this.handle);
  }

  /**
   * Sets a single, custom integer for a unit.
   * @note This value is not used by any standard mechanisms in Warcraft III nor
   * in the blizzard.j, so it is free to be harnessed.
   * Besides `GetHandleId`, this is an excellent possibility to assign a unique
   * integer id to a unit, which can serve as an index in other data structures.
   */
  public set userData(value: number) {
    SetUnitUserData(this.handle, value);
  }

  public set waygateActive(flag: boolean) {
    WaygateActivate(this.handle, flag);
  }

  public get waygateActive() {
    return WaygateIsActive(this.handle);
  }

  /**
   * Retrieves the position of the unit on the x-axis.
   */
  public get x() {
    return GetUnitX(this.handle);
  }

  /**
   * Sets the position of the unit on the x-axis.
   */
  public set x(value: number) {
    SetUnitX(this.handle, value);
  }

  /**
   * Retrieves the position of the unit on the y-axis.
   */
  public get y() {
    return GetUnitY(this.handle);
  }

  /**
   * Sets the position of the unit on the y-axis.
   */
  public set y(value: number) {
    SetUnitY(this.handle, value);
  }

  /**
   * Gets the position of the unit on the z-axis.
   */
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

  /**
   * Adds the provided amount of gold to this unit (only works if this unit is a gold mine).
   * @bug If the value after adding negative amount will be less than zero, then it
   * will display negative resource amount, but if some peasant or peon will try to
   * gather resources from such a mine, he will bring back 0 gold and the mine will
   * be auto-destroyed.
   * @param amount The amount of resources to add to the unit.
   */
  public addResourceAmount(amount: number) {
    AddResourceAmount(this.handle, amount);
  }

  public addSleepPerm(add: boolean) {
    UnitAddSleepPerm(this.handle, add);
  }

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
   * @bug Has been known to cause crashes in battle.net
   * @param delay (what resolution does this field have, milliseconds?)
   * @param radius area of effect of the damage application
   * @param x position on the X-Axis
   * @param y position on the Y-Axis
   * @param amount amount of damage
   * @param attack consider the damage dealt as being an attack
   * @param ranged consider the damage dealt as being from a ranged source
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
   * @param attack consider the damage dealt as being an attack
   * @param ranged consider the damage dealt as being from a ranged source
   * @param attackType type of the attack
   * @param damageType type of the damage that will be applied
   * @param weaponType type of the weapon that will be used
   */
  public damageTarget(target: widget, amount: number, radius: number, attack: boolean, ranged: boolean, attackType: attacktype, damageType: damagetype, weaponType: weapontype) {
    return UnitDamageTarget(this.handle, target, amount, attack, ranged, attackType, damageType, weaponType);
  }

  /**
   * Decreases the level of the given ability for this unit by one.
   * @param abilCode 
   */
  public decAbilityLevel(abilCode: number) {
    return DecUnitAbilityLevel(this.handle, abilCode);
  }

  public destroy() {
    RemoveUnit(this.handle);
  }

  /**
   * Disables the given ability for this unit optionally hiding the ui as well.
   * 
   * @param abilId ability to hide
   * @param hideUI also hide the icon in the ui
   */
  public disableAbility(abilId: number, hideUI: boolean) {
    BlzUnitHideAbility(this.handle, abilId, hideUI);
  }

  /**
   * Drops the specified item at the given position.
   * @param whichItem item to drop
   * @param x 
   * @param y 
   */
  public dropItem(whichItem: Item, x: number, y: number) {
    return UnitDropItemPoint(this.handle, whichItem.handle, x, y);
  }

  /**
   * Drops the item currently in the provided inventory slot.
   * @param whichItem 
   * @param slot 
   */
  public dropItemFromSlot(whichItem: Item, slot: number) {
    return UnitDropItemSlot(this.handle, whichItem.handle, slot);
  }

  public dropItemTarget(whichItem: Item, target: Widget/* | Unit | Item | Destructable*/) {
    return UnitDropItemTarget(this.handle, whichItem.handle, target.handle);
  }

  /**
   * Finishes the cooldown on the given ability for this unit.
   * @param abilCode 
   */
  public endAbilityCooldown(abilCode: number) {
    BlzEndUnitAbilityCooldown(this.handle, abilCode);
  }

  /**
   * Retrieves the ability with the given id.
   * @param abilId 
   */
  public getAbility(abilId: number) {
    return BlzGetUnitAbility(this.handle, abilId);
  }

  public getAbilityByIndex(index: number) {
    return BlzGetUnitAbilityByIndex(this.handle, index);
  }

  /**
   * Retrieves the cooldown for the given ability and level.
   * @param abilId 
   * @param level 
   */
  public getAbilityCooldown(abilId: number, level: number) {
    return BlzGetUnitAbilityCooldown(this.handle, abilId, level);
  }

  /**
   * Retrieves the cooldown currently remaining on the given ability.
   * @param abilId 
   */
  public getAbilityCooldownRemaining(abilId: number) {
    return BlzGetUnitAbilityCooldownRemaining(this.handle, abilId);
  }

  /**
   * Retrieves the current level of the given ability.
   * @param abilCode 
   */
  public getAbilityLevel(abilCode: number) {
    return GetUnitAbilityLevel(this.handle, abilCode);
  }

  /**
   * Retrieves the mana cost for the given ability and level.
   * @param abilId 
   * @param level 
   */
  public getAbilityManaCost(abilId: number, level: number) {
    return BlzGetUnitAbilityManaCost(this.handle, abilId, level);
  }

  /**
   * Retrieves the agility of this hero, optionally including bonuses.
   * @param includeBonuses 
   */
  public getAgility(includeBonuses: boolean) {
    return GetHeroAgi(this.handle, includeBonuses);
  }

  /**
   * Retrieves the time between attacks of the given weapon.
   * @param weaponIndex 
   */
  public getAttackCooldown(weaponIndex: number) {
    return BlzGetUnitAttackCooldown(this.handle, weaponIndex);
  }

  /**
   * Retrieves the amount of base damage for the given weapon.
   * @param weaponIndex 
   */
  public getBaseDamage(weaponIndex: number) {
    return BlzGetUnitBaseDamage(this.handle, weaponIndex);
  }

  /**
   * Retrieves the number of dice in the damage calculation for the given weapon.
   * @param weaponIndex 
   */
  public getDiceNumber(weaponIndex: number) {
    return BlzGetUnitDiceNumber(this.handle, weaponIndex);
  }

  /**
   * Retrieves the number of sides on each dice in the damage calculation for the given weapon.
   * @param weaponIndex 
   */
  public getDiceSides(weaponIndex: number) {
    return BlzGetUnitDiceSides(this.handle, weaponIndex);
  }

  /**
   * Retrieves the value of select fields of this unit. 
   * @param field name of the field
   * @note Available fields are prefixed with `UNIT_` followed by the field types:
   * - IF = integer
   * - BF = boolean
   * - RF = real
   * - SF = string
   * @example
   * ```ts
   * // agility
   * const agi = unit.getField(UNIT_IF_AGILITY)
   * // isBuilding
   * const isBuilding = unit.getField(UNIT_BF_IS_A_BUILDING)
   * ```
   */
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

  /**
   * Retrieves the unit's flying height.
   */
  public getflyHeight() {
    return GetUnitFlyHeight(this.handle);
  }

  /**
   * Retrieves the level of the hero.
   */
  public getHeroLevel() {
    return GetHeroLevel(this.handle);
  }

  public getIgnoreAlarm(flag: boolean) {
    return UnitIgnoreAlarm(this.handle, flag);
  }

  /**
   * Retrieves the hero's current intelligence, optionally including bonuses.
   * @param includeBonuses
   */
  public getIntelligence(includeBonuses: boolean) {
    return GetHeroInt(this.handle, includeBonuses);
  }

  /**
   * Retrieves the item in the specified inventory slot.
   * @param slot 
   */
  public getItemInSlot(slot: number) {
    return UnitItemInSlot(this.handle, slot);
  }

  /**
   * Retrieves the specified unit state value.
   * @param whichUnitState wich state to return (i.e. `UNIT_STATE_LIFE`)
   * @example
   * ```ts
   * const health = unit.getState(UNIT_STATE_LIFE)
   * const maxHealth = unit.getState(UNIT_STATE_MAX_LIFE)
   * ```
   */
  public getState(whichUnitState: unitstate) {
    return GetUnitState(this.handle, whichUnitState);
  }

  /**
   * Retrieves the hero's current strength, optionally including bonuses.
   * @param includeBonuses 
   */
  public getStrength(includeBonuses: boolean) {
    return GetHeroStr(this.handle, includeBonuses);
  }

  public hasBuffs(removePositive: boolean, removeNegative: boolean, magic: boolean, physical: boolean, timedLife: boolean, aura: boolean, autoDispel: boolean) {
    return UnitHasBuffsEx(this.handle, removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
  }

  public hasItem(whichItem: Item) {
    return UnitHasItem(this.handle, whichItem.handle);
  }

  // duplicate?
  public hideAbility(abilId: number, flag: boolean) {
    BlzUnitHideAbility(this.handle, abilId, flag);
  }

  /**
   * Increase the level of the given ability by one.
   * @param abilCode 
   */
  public incAbilityLevel(abilCode: number) {
    return IncUnitAbilityLevel(this.handle, abilCode);
  }

  /**
   * Returns true if this unit is part of the given force.
   * @param whichForce 
   */
  public inForce(whichForce: Force) {
    return IsUnitInForce(this.handle, whichForce.handle);
  }

  /**
   * Returns true if this unit is part of the given group.
   * @param whichGroup 
   */
  public inGroup(whichGroup: Group) {
    return IsUnitInGroup(this.handle, whichGroup.handle);
  }

  /**
   * Returns true if this unit is in range of the given coordinates.
   * @param x 
   * @param y 
   * @param distance 
   */
  public inRange(x: number, y: number, distance: number) {
    return IsUnitInRangeXY(this.handle, x, y, distance);
  }

  /**
   * Returns true if this unit is in range of the given point.
   * @param whichPoint 
   * @param distance 
   */
  public inRangeOfPoint(whichPoint: Point, distance: number) {
    return IsUnitInRangeLoc(this.handle, whichPoint.handle, distance);
  }

  /**
   * Returns true if this unit is in range of the given unit.
   * @param otherUnit 
   * @param distance 
   */
  public inRangeOfUnit(otherUnit: Unit, distance: number) {
    return IsUnitInRange(this.handle, otherUnit.handle, distance);
  }

  public interruptAttack() {
    BlzUnitInterruptAttack(this.handle);
  }

  public inTransport(whichTransport: Unit) {
    return IsUnitInTransport(this.handle, whichTransport.handle);
  }

  /**
   * Returns true if this unit is alive.
   */
  public isAlive(): boolean {
    return UnitAlive(this.handle);
  }

  /**
   * Returns true if the given player is an ally for this unit.
   * @param whichPlayer 
   */
  public isAlly(whichPlayer: MapPlayer) {
    return IsUnitAlly(this.handle, whichPlayer.handle);
  }

  /**
   * Returns true if the given player is an enemy for this unit.
   * @param whichPlayer 
   */
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

  /**
   * Orders this unit to build a new unit at the given coordinates.
   * @param unit unit to be built
   * @param x 
   * @param y 
   */
  public issueBuildOrder(unit: string | number, x: number, y: number) {
    return typeof unit === "string" ? IssueBuildOrder(this.handle, unit, x, y) : IssueBuildOrderById(this.handle, unit, x, y);
  }

  /**
   * Gives the specified order (with no target) to this unit.
   * @param order 
   */
  public issueImmediateOrder(order: string | number) {
    return typeof order === "string" ? IssueImmediateOrder(this.handle, order) : IssueImmediateOrderById(this.handle, order);
  }

  /**
   * Gives the specified order (targeting a point) to this unit.
   * @param order 
   * @param x 
   * @param y 
   * @param instantTargetWidget 
   */
  public issueInstantOrderAt(order: string | number, x: number, y: number, instantTargetWidget: Widget) {
    return typeof order === "string" ? IssueInstantPointOrder(this.handle, order, x, y, instantTargetWidget.handle) : IssueInstantPointOrderById(this.handle, order, x, y, instantTargetWidget.handle);
  }

  /**
   * Gives the specified order (targeting a unit) to this unit.
   * @param order 
   * @param targetWidget 
   * @param instantTargetWidget 
   */
  public issueInstantTargetOrder(order: string | number, targetWidget: Widget, instantTargetWidget: Widget) {
    return typeof order === "string" ? IssueInstantTargetOrder(this.handle, order, targetWidget.handle, instantTargetWidget.handle) : IssueInstantTargetOrderById(this.handle, order, targetWidget.handle, instantTargetWidget.handle);
  }

  /**
   * Gives the specified order (targeting a point) to this unit.
   * @param order 
   * @param x 
   * @param y 
   */
  public issueOrderAt(order: string | number, x: number, y: number) {
    return typeof order === "string" ? IssuePointOrder(this.handle, order, x, y) : IssuePointOrderById(this.handle, order, x, y);
  }

  /**
   * 
   * @param order 
   * @param whichPoint 
   */
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
