import { DrawerPreviewDirective } from './drawer-preview.directive';
import { TestViewContainerRef } from 'src/app/models/testViewContainerRef';

describe('DrawerPreviewDirective', () => {
  it('should create an instance', () => {
    const directive = new DrawerPreviewDirective(new TestViewContainerRef());
    expect(directive).toBeTruthy();
  });
});
