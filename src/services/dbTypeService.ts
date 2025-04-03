import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDbTypeFlags, getDbTypeImage } from '../store/actions/project.actions';
import { selectDbTypeFlagsById, selectDbTypeImageById } from '../store/selectors/project.selectors';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbTypeService {
  constructor(
    private store: Store,
    private sessionService: SessionService
  ) {}

  public async getFlags(dbTypeId: string) {
    // Check if flags are already in state
    const flags = await firstValueFrom(this.store.select(selectDbTypeFlagsById(dbTypeId)));
    if (flags) {
      return flags;
    }

    // If not in state, dispatch action to fetch flags
    this.store.dispatch(getDbTypeFlags({ dbTypeId }));
    return await firstValueFrom(this.store.select(selectDbTypeFlagsById(dbTypeId)));
  }

  public async prepareDbTypesImages(dbTypes: any[]) {
    if (this.shouldFetchImages(dbTypes)) {
      const dbTypeImagePromises = dbTypes.map(dbType => 
        this.fetchDbTypeImage(dbType.key)
      );
      
      const dbTypeImages = await Promise.all(dbTypeImagePromises);
      dbTypeImages.forEach((dbTypeImage, index) => {
        if (dbTypeImage) {
          this.storeImageInLocalStorage(dbTypes[index].key, dbTypeImage);
        }
      });
    }
  }

  public shouldFetchImages(dbTypes: any[]): boolean {
    return !dbTypes.some(dbType => 
      this.getDbTypeImageFromLocalStorage(dbType.key)
    );
  }

  public async fetchDbTypeImage(dbTypeId: string) {
    // Check if image is already in state
    const image = await firstValueFrom(this.store.select(selectDbTypeImageById(dbTypeId)));
    if (image) {
      return image;
    }

    // If not in state, dispatch action to fetch image
    this.store.dispatch(getDbTypeImage({ dbTypeId }));
    return await firstValueFrom(this.store.select(selectDbTypeImageById(dbTypeId)));
  }

  public getDbTypeImageFromLocalStorage(dbTypeId: string): any {
    return this.sessionService.get(this.getLocalStorageImageKey(dbTypeId));
  }

  public storeImageInLocalStorage(dbTypeId: string, dbTypeImage: any): void {
    this.sessionService.set(this.getLocalStorageImageKey(dbTypeId), dbTypeImage);
  }

  public getLocalStorageImageKey(dbTypeId: string): string {
    return `dbTypeImage-${dbTypeId}-v${window.__env.config.versionRM}`;
  }
}
