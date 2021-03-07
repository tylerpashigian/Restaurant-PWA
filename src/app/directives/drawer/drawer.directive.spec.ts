import { DrawerDirective } from './drawer.directive';
import { TestViewContainerRef } from 'src/app/models/testViewContainerRef';

describe('DrawerDirective', () => {
  it('should create an instance', () => {
    const directive = new DrawerDirective(new TestViewContainerRef());
    expect(directive).toBeTruthy();
  });
});
