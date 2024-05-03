//
//  RNPencilKitUtil.h
//  RNPencilKit
//
//  Created by mj on 5/3/24.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

static UIColor* intToColor(NSInteger colorValue) {
  NSUInteger alpha = (colorValue >> 24) & 0xFF;
  NSUInteger red = (colorValue >> 16) & 0xFF;
  NSUInteger green = (colorValue >> 8) & 0xFF;
  NSUInteger blue = colorValue & 0xFF;
  return [UIColor colorWithRed:red / 255.0
                         green:green / 255.0
                          blue:blue / 255.0
                         alpha:alpha / 255.0];
}
