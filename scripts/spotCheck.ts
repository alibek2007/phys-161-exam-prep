import * as newton from '../src/lib/physics/newton'
import * as friction from '../src/lib/physics/friction'
import * as circular from '../src/lib/physics/circular'
import * as kinematics from '../src/lib/physics/kinematics'
import * as projectile from '../src/lib/physics/projectile'
import * as units from '../src/lib/physics/units'
import * as uncertainty from '../src/lib/physics/uncertainty'
import { toRad } from '../src/lib/physics/vectors'

function check(label: string, expected: number, actual: number, tolPct = 1) {
  const pct = Math.abs((actual - expected) / expected) * 100
  const ok = pct < tolPct
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}: expected=${expected} actual=${actual.toFixed(5)} (${pct.toFixed(3)}%)`)
  return ok
}

let allOk = true
allOk = check('P83 net force', 2905, (() => {
  const m = 1430, r = 61, T = 49, g = 9.8
  const aTan = (4 * Math.PI * r) / (T * T)
  const t1 = T / Math.SQRT2
  const v = aTan * t1
  const radial = (v * v) / r
  return m * Math.hypot(aTan, radial)
})(), 0.5) && allOk

allOk = check('P94 mu diff', 0.305, friction.staticKineticFrictionDiff(1.645, 3.561, 2.92, 9.8), 0.5) && allOk
allOk = check('P96 accel', 6.55, friction.accelForceAtAngleWithHangingMass(302.2, toRad(30.9), 26.2, 4.3, 0.17, 9.8), 0.5) && allOk
allOk = check('P99 min force', 749.53631, friction.minForceBlockAgainstBlock(20.6, 61.2, 0.36, 9.8), 0.5) && allOk

allOk = check('P108 link3-2', 14.4, newton.chainLinkForce(2, 0.6, 9.8, 2.2), 0.1) && allOk
allOk = check('P110 link4-3', 19.965, newton.chainLinkForce(3, 0.55, 9.8, 2.3), 0.1) && allOk
allOk = check('P111 link5-4', 10, newton.chainLinkForce(4, 0.2, 9.8, 2.7), 0.1) && allOk

allOk = check('P127 m2 up const speed', 195.7938, newton.inclinePulleyMassForAccel(280, toRad(39), 0.09, 9.8, 0, 1), 0.1) && allOk
allOk = check('P128 m2 down const speed', 62.750, newton.inclinePulleyMassForAccel(150, toRad(29), 0.076, 9.8, 0, -1), 0.1) && allOk
allOk = check('P129 m2 up accel', 165.928, newton.inclinePulleyMassForAccel(185, toRad(33), 0.12, 9.8, 1.3, 1), 0.1) && allOk
allOk = check('P130 tension', 1590.14, newton.inclinePulleyTensionFromM1(225, toRad(42), 0.07, 9.8, 0, 1), 0.1) && allOk

allOk = check('P131 friction', 10.1567, newton.cordAngleFriction(13, toRad(52)), 0.5) && allOk
allOk = check('P132 max weight', 17.76, newton.cordAngleMaxWeight(0.24, 74, toRad(45)), 0.1) && allOk
allOk = check('P133 min mu', 0.176374, newton.cordAngleMinMu(17.5, 62, toRad(58)), 0.5) && allOk

allOk = check('P134 drag together', 0.748, newton.dragBlockTogether(1.3, 3.1, 0.17), 0.1) && allOk
allOk = check('P135 drag from under', 1.32, newton.dragBlockFromUnder(1.1, 3.3, 0.24), 0.1) && allOk

allOk = check('P137 brush F', 18.245804831566, newton.windowBrushForce(14, 0.17, toRad(58.8), 9.8), 0.5) && allOk
allOk = check('P139 brush F accel', 16.3772, newton.windowBrushForce(10.5, 0.17, toRad(53.8), 9.8, 1), 0.5) && allOk

allOk = check('P121 max weight', 5399.518, newton.twoRopeMaxWeight(4200, toRad(60), toRad(40)), 0.1) && allOk
allOk = check('P122 tension', 1954.7, newton.twoRopeTensionAtAngle(3850, toRad(40), toRad(60)), 0.1) && allOk

allOk = check('P143 bottom N', 84.58, newton.normalForceCylinderBottom(2, 11.4, 4, 9.8), 0.1) && allOk
allOk = check('P144 top N', 67.1495, newton.normalForceCylinderTop(2.2, 12.7, 4, 9.8), 0.1) && allOk

allOk = check('P148 apparent weight hill', 495.61, newton.apparentWeightHillTop(74, 11, 39, 9.8), 0.1) && allOk
allOk = check('P150 apparent weight valley', 1084.74, newton.apparentWeightValleyBottom(82, 12, 42, 9.8), 0.1) && allOk

allOk = check('P88 mu skid half', 0.779, circular.skidFrictionCoefficient(1.2, 0.5, 9.8), 0.5) && allOk
allOk = check('P89 accel skid third', 1.63845, circular.skidTangentialAccel(0.72, 1 / 3, 9.8), 0.5) && allOk
allOk = check('P92 conical pendulum v', 0.721, circular.conicalPendulumSpeed(0.88, toRad(14), 9.8), 0.5) && allOk
allOk = check('P93 banking angle', 0.47177751, circular.bankingAngle(20, 80, 9.8), 0.5) && allOk

allOk = check('P36 time to hit', 1.5211348322352, kinematics.timeFromDisplacement(19.5, 9.8, 41), 0.1) && allOk
allOk = check('P37 time to hit', 4.80919, kinematics.timeFromDisplacement(14, -9.8, -46), 0.1) && allOk
allOk = check('P46 catch distance', 147.27272727273, kinematics.pursuitCatchDistance(18, 4.4), 0.1) && allOk

allOk = check('P59 x', 7290.5381227112, projectile.projectileX(291, toRad(57), 46), 0.1) && allOk
allOk = check('P63 height below', 133.73819780, projectile.projectileHeightBelowLaunch(6, toRad(-22), 5, 9.8), 0.1) && allOk
allOk = check('P64 height below', 133.243, projectile.projectileHeightBelowLaunch(6, toRad(27), 5.5, 9.8), 0.1) && allOk

allOk = check('P1 sphere radius', 0.04167, units.sphereRadiusFromMassDensity(6000, 19.8) / 100, 0.5) && allOk
allOk = check('P13 disk volume unc', 0.2066875, uncertainty.uncertaintyDiskVolume(8.6, 0.03, 0.08, 0.003), 0.5) && allOk

console.log(allOk ? '\nALL SPOT CHECKS PASSED' : '\nSOME SPOT CHECKS FAILED')
if (!allOk) process.exit(1)
