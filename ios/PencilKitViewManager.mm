#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

@interface PencilKitViewManager : RCTViewManager
@end

@implementation PencilKitViewManager

RCT_EXPORT_MODULE(PencilKitView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
