import * as THREE from 'three';
import { getMaterials } from './models/materials';
import { WorldPosition } from './types';

export class PlayerCharacter {
  public mesh: THREE.Group;
  public position: THREE.Vector3 = new THREE.Vector3(0, 2.3, 2);
  public targetPosition: THREE.Vector3 | null = null;
  public isMoving: boolean = false;
  private moveSpeed: number = 7.5;
  private facingAngle: number = 0;
  private walkTime: number = 0;
  private staffMesh: THREE.Mesh | null = null;
  private hatMesh: THREE.Mesh | null = null;
  private bodyMesh: THREE.Mesh | null = null;

  constructor() {
    this.mesh = this.buildCharacterMesh();
    this.mesh.position.copy(this.position);
  }

  private buildCharacterMesh(): THREE.Group {
    const mats = getMaterials();
    const group = new THREE.Group();

    // 1. Robe Body (Stylized Áo Dài / Hanbok fusion)
    const bodyGeo = new THREE.CylinderGeometry(0.22, 0.38, 0.9, 10);
    this.bodyMesh = new THREE.Mesh(bodyGeo, mats.dancheongEaves);
    this.bodyMesh.position.y = 0.55;
    this.bodyMesh.castShadow = true;
    group.add(this.bodyMesh);

    // Belt Sash
    const beltGeo = new THREE.CylinderGeometry(0.26, 0.28, 0.12, 10);
    const belt = new THREE.Mesh(beltGeo, mats.redLacquer);
    belt.position.y = 0.65;
    group.add(belt);

    // 2. Head
    const headGeo = new THREE.SphereGeometry(0.22, 12, 12);
    const head = new THREE.Mesh(headGeo, mats.whiteWall);
    head.position.y = 1.15;
    head.castShadow = true;
    group.add(head);

    // 3. Bamboo Conical Nón Lá / Gat Hat
    const hatGeo = new THREE.ConeGeometry(0.65, 0.35, 16);
    this.hatMesh = new THREE.Mesh(hatGeo, mats.timberWood);
    this.hatMesh.position.y = 1.35;
    this.hatMesh.castShadow = true;
    group.add(this.hatMesh);

    // Hat ribbon trim
    const trimGeo = new THREE.TorusGeometry(0.65, 0.02, 6, 16);
    trimGeo.rotateX(Math.PI / 2);
    const trim = new THREE.Mesh(trimGeo, mats.redLacquer);
    trim.position.y = 1.25;
    group.add(trim);

    // 4. Wooden Walking Staff (with brass ring)
    const staffGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4, 6);
    this.staffMesh = new THREE.Mesh(staffGeo, mats.agedWood);
    this.staffMesh.position.set(0.35, 0.7, 0.2);
    this.staffMesh.castShadow = true;
    group.add(this.staffMesh);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 6, 12), mats.goldTrim);
    ring.position.set(0.35, 1.38, 0.2);
    group.add(ring);

    // 5. Gourd Canteen on hip
    const gourd = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), mats.lanternSilkYellow);
    gourd.position.set(-0.28, 0.62, 0);
    group.add(gourd);

    // Shadow blob beneath player
    const shadowGeo = new THREE.CircleGeometry(0.45, 12);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.4
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.position.y = 0.02;
    group.add(shadow);

    return group;
  }

  public setTarget(target: THREE.Vector3) {
    this.targetPosition = target.clone();
  }

  public teleport(pos: WorldPosition) {
    this.position.set(pos.x, pos.y, pos.z);
    this.targetPosition = null;
    this.isMoving = false;
    this.mesh.position.copy(this.position);
  }

  public update(delta: number, inputDirection: THREE.Vector2 | null) {
    let moved = false;

    if (inputDirection && inputDirection.lengthSq() > 0.001) {
      // WASD / Arrow keyboard motion
      // Transform camera isometric angle (45 degrees rotated)
      const moveX = (inputDirection.x - inputDirection.y) * 0.7071;
      const moveZ = (inputDirection.x + inputDirection.y) * 0.7071;

      const step = this.moveSpeed * delta;
      this.position.x += moveX * step;
      this.position.z += moveZ * step;

      this.facingAngle = Math.atan2(moveX, moveZ);
      moved = true;
      this.targetPosition = null;
    } else if (this.targetPosition) {
      // Click-to-move pathing
      const diffX = this.targetPosition.x - this.position.x;
      const diffZ = this.targetPosition.z - this.position.z;
      const dist = Math.sqrt(diffX * diffX + diffZ * diffZ);

      if (dist > 0.2) {
        const step = Math.min(dist, this.moveSpeed * delta);
        this.position.x += (diffX / dist) * step;
        this.position.z += (diffZ / dist) * step;
        this.facingAngle = Math.atan2(diffX, diffZ);
        moved = true;
      } else {
        this.targetPosition = null;
      }
    }

    // Adjust height based on terrain zone
    const targetY = this.calculateGroundHeight(this.position.x, this.position.z);
    this.position.y = THREE.MathUtils.damp(this.position.y, targetY, 10, delta);

    this.isMoving = moved;
    if (moved) {
      this.walkTime += delta * 12;
      // Walking bob & staff tilt
      const bob = Math.sin(this.walkTime) * 0.08;
      this.mesh.position.set(this.position.x, this.position.y + bob, this.position.z);
      this.mesh.rotation.y = THREE.MathUtils.damp(this.mesh.rotation.y, this.facingAngle, 12, delta);

      if (this.staffMesh) {
        this.staffMesh.rotation.x = Math.sin(this.walkTime) * 0.25;
      }
    } else {
      this.mesh.position.copy(this.position);
      if (this.staffMesh) {
        this.staffMesh.rotation.x = 0;
      }
    }
  }

  private calculateGroundHeight(x: number, z: number): number {
    // Highlands area (NW)
    if (x < -8 && z < -6) {
      const distToPeak = Math.hypot(x - (-19), z - (-17));
      if (distToPeak < 8) return 5.2;
      if (distToPeak < 11) return 4.0;
      return 2.4;
    }
    // Mountains area (SW)
    if (x < -6 && z > 6) {
      const distToPagoda = Math.hypot(x - (-17), z - 17);
      if (distToPagoda < 6) return 6.4;
      const distToTiger = Math.hypot(x - (-11), z - 21);
      if (distToTiger < 5) return 4.5;
      return 3.2;
    }
    // Festival Grounds (North)
    if (Math.abs(x) < 8 && z < -13) {
      return 2.15;
    }
    // Harbor (NE)
    if (x > 8 && z < -6) {
      return 1.35;
    }
    // Archipelago (SE)
    if (x > 8 && z > 6) {
      return 1.15;
    }
    // Central Capital
    return 2.2;
  }
}
