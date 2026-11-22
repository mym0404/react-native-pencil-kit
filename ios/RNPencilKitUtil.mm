//
//  RNPencilKitUtil.m
//  RNPencilKit
//
//  Created by mj on 5/4/24.
//

#import "RNPencilKitUtil.h"
#import "RNPencilKit.h"
#import <React/RCTUtils.h>

@implementation RNPencilKitUtil

@synthesize viewRegistry_DEPRECATED = _viewRegistry_DEPRECATED;

RCT_EXPORT_MODULE()

- (RNPencilKit*)getView:(double)viewId {
  return static_cast<RNPencilKit*>([self.viewRegistry_DEPRECATED viewForReactTag:@(viewId)]);
}
- (void)doReject:(RCTPromiseRejectBlock)reject name:(NSString*)name {
  reject(@"RNPencilKit", [@"failed to " stringByAppendingString:name],
         [[NSError alloc] initWithDomain:@"RNPencilKit" code:444 userInfo:@{}]);
}

- (void)getBase64Data:(double)viewId
              resolve:(RCTPromiseResolveBlock)resolve
               reject:(RCTPromiseRejectBlock)reject {
  RCTExecuteOnMainQueue(^{
    RNPencilKit* view = [self getView:viewId];
    NSString* ret = [view getBase64Data];
    if (ret) {
      resolve(ret);
    } else {
      [self doReject:reject name:@"getBase64Data"];
    }
  });
}

- (void)getBase64PngData:(double)viewId
                   scale:(double)scale
                 resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject {
  RCTExecuteOnMainQueue(^{
    RNPencilKit* view = [self getView:viewId];
    NSString* ret = [view getBase64PngData:scale];
    if (ret) {
      resolve(ret);
    } else {
      [self doReject:reject name:@"getBase64PngData"];
    }
  });
}

- (void)getBase64JpegData:(double)viewId
                    scale:(double)scale
              compression:(double)compression
                  resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject {
  RCTExecuteOnMainQueue(^{
    RNPencilKit* view = [self getView:viewId];
    NSString* ret = [view getBase64JpegData:scale compression:compression];
    if (ret) {
      resolve(ret);
    } else {
      [self doReject:reject name:@"getBase64JpegData"];
    }
  });
}

- (void)saveDrawing:(double)viewId
               path:(NSString*)path
            resolve:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject {
  RCTExecuteOnMainQueue(^{
    RNPencilKit* view = [self getView:viewId];
    NSString* ret = [view saveDrawing:path];
    if (ret) {
      resolve(ret);
    } else {
      [self doReject:reject name:@"saveDrawing"];
    }
  });
}

- (void)loadDrawing:(double)viewId
               path:(NSString*)path
            resolve:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject {
  RCTExecuteOnMainQueue(^{
    RNPencilKit* view = [self getView:viewId];
    BOOL ret = [view loadDrawing:path];
    if (ret) {
      resolve(@"");
    } else {
      [self doReject:reject name:@"loadDrawing"];
    }
  });
}

- (void)loadBase64Data:(double)viewId
                base64:(NSString*)base64
               resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject {
  RCTExecuteOnMainQueue(^{
    RNPencilKit* view = [self getView:viewId];
    BOOL ret = [view loadBase64Data:base64];
    if (ret) {
      resolve(@"");
    } else {
      [self doReject:reject name:@"loadBase64Data"];
    }
  });
}

- (NSNumber*)isPencilKitAvailable {
  if (@available(iOS 14, *)) {
    return @(YES);
  } else {
    return @(NO);
  }
}

- (NSNumber*)isiOSEqualsOrGreaterThan17 {
  if (@available(iOS 17, *)) {
    return @(YES);
  } else {
    return @(NO);
  }
}

- (NSNumber*)isiOSEqualsOrGreaterThan16_4 {
  if (@available(iOS 16.4, *)) {
    return @(YES);
  } else {
    return @(NO);
  }
}

- (NSArray<NSString*>*)getAvailableTools {
  if (![self isPencilKitAvailable].boolValue) {
    return @[];
  }

  NSMutableArray<NSString*>* tools = [@[ @"pen", @"pencil", @"marker" ] mutableCopy];
  if (@available(iOS 17.0, *)) {
    [tools addObjectsFromArray:@[ @"monoline", @"fountainPen", @"watercolor", @"crayon" ]];
  }
  [tools addObjectsFromArray:@[ @"eraserVector", @"eraserBitmap" ]];
  if (@available(iOS 16.4, *)) {
    [tools addObject:@"eraserFixedWidthBitmap"];
  }
  [tools addObject:@"lasso"];
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 260000
  if (@available(iOS 26.0, *)) {
    [tools addObject:@"reed"];
  }
#endif
  return tools;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams&)params {
  return std::make_shared<facebook::react::NativeRNPencilKitUtilSpecJSI>(params);
}

@end
