/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : pro

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2016-11-25 00:24:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for circles
-- ----------------------------
DROP TABLE IF EXISTS `circles`;
CREATE TABLE `circles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '圈子编号',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `name` varchar(100) NOT NULL COMMENT '圈子名称',
  `dynamic` tinyint(2) NOT NULL DEFAULT '2' COMMENT '首页讯息串中的讯息数量。0没有1减少2标准3更多',
  `notice` tinyint(2) NOT NULL DEFAULT '1' COMMENT '是否获取有关新信息的通知。1获取0不获取',
  `follownum` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '圈子内的用户数量',
  `followid` text COMMENT '圈子内的用户编号列表，逗号分隔',
  `addtime` int(10) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of circles
-- ----------------------------
INSERT INTO `circles` VALUES ('3', '7', 'aaa', '2', '1', '1', '4', '1479986374');
INSERT INTO `circles` VALUES ('4', '7', 'bbb', '2', '1', '2', '8,11', '1479987171');
INSERT INTO `circles` VALUES ('5', '7', 'ccc', '2', '1', '1', '12', '1479989174');
INSERT INTO `circles` VALUES ('6', '7', 'ddd', '2', '1', '1', '10', '1479989209');
INSERT INTO `circles` VALUES ('7', '7', 'lll', '2', '1', '0', null, '1479993594');
INSERT INTO `circles` VALUES ('8', '13', 'aaa', '2', '1', '3', '12,10,7', '1479998566');
INSERT INTO `circles` VALUES ('9', '13', 'bbb', '2', '1', '0', null, '1479998598');
INSERT INTO `circles` VALUES ('10', '16', 'vvv', '2', '1', '1', '13', '1479999204');

-- ----------------------------
-- Table structure for collections
-- ----------------------------
DROP TABLE IF EXISTS `collections`;
CREATE TABLE `collections` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '收藏集编号',
  `title` varchar(100) NOT NULL COMMENT '收藏集标题',
  `slogan` varchar(500) DEFAULT NULL COMMENT '收藏集标语',
  `addtime` int(10) unsigned NOT NULL COMMENT '创建时间',
  `userid` int(11) NOT NULL COMMENT '所属用户编号',
  `circleid` varchar(500) DEFAULT NULL COMMENT '有权查看的圈子编号列表，逗号分隔',
  `peopleid` varchar(500) DEFAULT NULL COMMENT '有权查看的用户编号列表，逗号分隔',
  `hide` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否仅自己可见。1仅自己可见',
  `fansnum` int(11) NOT NULL DEFAULT '0' COMMENT '粉丝数量',
  `fans` text COMMENT '粉丝编号列表，逗号分隔',
  `postnum` int(11) NOT NULL DEFAULT '0' COMMENT '收藏集内帖子数量',
  `picid` int(11) DEFAULT '1' COMMENT '收藏集图片编号',
  `background` varchar(100) NOT NULL COMMENT '收藏集背景色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collections
-- ----------------------------
INSERT INTO `collections` VALUES ('59', '滚滚红尘 Panda', '万物皆有裂痕，那是光照进来的地方', '1479953742', '8', null, null, '0', '1', '13,', '0', '72', '#00ABC0');
INSERT INTO `collections` VALUES ('60', '好享寧靜大自然 ', ' 攝於香港城門水塘  ', '1479956870', '9', null, null, '0', '2', '12,13,', '0', '83', '#A900FF');
INSERT INTO `collections` VALUES ('61', '小鳥站枝頭~ 週日愉快 ', 'hAPPy MooD ', '1479956567', '9', null, null, '0', '1', '13,', '0', '84', '#00ABC0');
INSERT INTO `collections` VALUES ('62', '123213', '23212312312', '1479958308', '9', null, null, '0', '1', '13,', '0', '88', '#A900FF');
INSERT INTO `collections` VALUES ('63', ' 黃昏夜 ~ ', ' 黃昏夜 ~  黃昏夜 ~ ', '1479957747', '9', null, null, '0', '0', null, '0', '86', '#00ABC0');
INSERT INTO `collections` VALUES ('64', '大家早安', '希望没扰人清梦', '1479958073', '9', null, null, '0', '0', '', '0', '89', '#00ABC0');
INSERT INTO `collections` VALUES ('65', '1231231', '21312312', '1479959079', '9', null, null, '0', '0', null, '0', '93', '#00ABC0');
INSERT INTO `collections` VALUES ('66', '这是我的第一个收藏集', '这是我的第一个收藏集', '1479959924', '12', null, null, '0', '1', '13,', '0', '94', '#029AE4');
INSERT INTO `collections` VALUES ('67', '123123', '1231231', '1479960992', '12', null, null, '0', '0', null, '0', '100', '#00ABC0');
INSERT INTO `collections` VALUES ('68', '21312312', '1231231231', '1479964227', '12', null, null, '0', '0', null, '0', '95', '#00ABC0');
INSERT INTO `collections` VALUES ('69', '12321323123', '213123123123', '1479964283', '12', null, null, '0', '0', null, '0', '101', '#00ABC0');
INSERT INTO `collections` VALUES ('70', '爱上兄弟连', '邓小平说的这么清楚，邓的家族有多少亿万富翁？', '1480000338', '13', null, null, '0', '0', null, '0', '1', '#EB3F79');
INSERT INTO `collections` VALUES ('71', 'i love you', 'i love you', '1480004445', '13', null, null, '0', '0', null, '0', '126', '#F8A724');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '评论编号',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `postid` int(10) unsigned NOT NULL COMMENT '所属帖子编号',
  `content` text COMMENT '评论内容',
  `picid` int(11) DEFAULT NULL COMMENT '图片编号',
  `linkid` int(11) DEFAULT NULL COMMENT '链接编号',
  `likes` int(11) NOT NULL DEFAULT '0' COMMENT '喜欢的数量',
  `likeuserid` text COMMENT '喜欢的用户编号列表，逗号分隔',
  `parentid` int(11) NOT NULL DEFAULT '0' COMMENT '父级评论编号',
  `path` varchar(255) NOT NULL DEFAULT '0' COMMENT '父级编号层级拼接',
  `addtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '1', '1', '虽然各色各', '1', '1', '1', '1', '1', '1,', '11152333');
INSERT INTO `comments` VALUES ('2', '2', '2', '三个太过挑剔', '2', '2', '2', '2', '2', '2,', '34234234');
INSERT INTO `comments` VALUES ('3', '3', '3', '嘎如果', '3', '3', '3', '3', '3', '3,', '234234');
INSERT INTO `comments` VALUES ('4', '4', '4', '公司各色各', '4', '4', '4', '4', '4', '4,', '4353453');
INSERT INTO `comments` VALUES ('5', '10', '2', 'nihao', null, null, '0', null, '0', '0,', '1479734306');
INSERT INTO `comments` VALUES ('6', '10', '2', 'qweqweqw', null, null, '0', null, '5', '0,5,', '1479734334');
INSERT INTO `comments` VALUES ('7', '8', '10', '哈哈个啥\n', null, null, '0', null, '0', '0,', '1479861702');
INSERT INTO `comments` VALUES ('8', '9', '45', 'kk', null, null, '0', null, '0', '0,', '1479973471');
INSERT INTO `comments` VALUES ('9', '9', '45', 'dgtg', null, null, '0', null, '0', '0,', '1479977132');
INSERT INTO `comments` VALUES ('10', '13', '46', '对我来说，有一项角逐胜过二者，那就是本周末开始的世界小姐总决赛。', null, null, '0', null, '0', '0,', '1479998444');
INSERT INTO `comments` VALUES ('11', '15', '48', 'A  child\'s  personal  bodyguard  and  their  footbal  team.  \n!﻿', null, null, '0', null, '0', '0,', '1479998959');
INSERT INTO `comments` VALUES ('12', '18', '51', 'The Labrador Retriever, also Labrador, is a type of retriever-gun dog. ', null, null, '0', null, '0', '0,', '1479999462');
INSERT INTO `comments` VALUES ('13', '14', '54', '别紧张，你会表现的很好！', null, null, '0', null, '0', '0,', '1480000554');

-- ----------------------------
-- Table structure for commoption
-- ----------------------------
DROP TABLE IF EXISTS `commoption`;
CREATE TABLE `commoption` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '类别编号',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `commid` int(11) DEFAULT NULL COMMENT '所属社区编号',
  `dynamic` tinyint(4) NOT NULL DEFAULT '2' COMMENT '首页讯息串中的讯息数量。0没有1减少2标准3更多',
  `sort` tinyint(4) NOT NULL DEFAULT '1' COMMENT '帖子排序方式1热门2新帖',
  `notice` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否获取有关新信息的通知。1获取0不获取',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commoption
-- ----------------------------

-- ----------------------------
-- Table structure for commtypes
-- ----------------------------
DROP TABLE IF EXISTS `commtypes`;
CREATE TABLE `commtypes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '类别编号',
  `commid` int(11) DEFAULT NULL COMMENT '所属社区编号',
  `name` varchar(100) NOT NULL COMMENT '类别名称',
  `parentid` int(11) NOT NULL DEFAULT '0' COMMENT '父级类别编号',
  `path` varchar(300) NOT NULL DEFAULT '0,' COMMENT '父级编号层级拼接',
  `addtime` int(11) NOT NULL,
  `postnum` int(11) NOT NULL DEFAULT '0' COMMENT '类别内帖子数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commtypes
-- ----------------------------
INSERT INTO `commtypes` VALUES ('1', '1', 'ZsCffC', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('2', '2', 'UOzbOc', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('3', '3', 'nRay80', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('5', '5', 'yNkjix', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('6', '6', 'MuaveU', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('7', '7', 'BClZ1A', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('8', '8', 'vrOHDw', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('9', '9', 'sczEVk', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('10', '10', '2Sam5s', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('11', '11', 'iKVYbe', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('12', '12', 'opYkNL', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('13', '13', '7TZYft', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('14', '14', 'dJtUv4', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('15', '15', 'PW9gNs', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('16', '16', 'ipoxal', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('17', '17', 'Wf82uQ', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('18', '18', 'DCwZKe', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('19', '19', 'Pvh8Zc', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('20', '20', 'ZeBx6c', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('21', '21', 'ZgiaF6', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('22', '22', 'pGtc2T', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('23', '23', 'jnt1m1', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('24', '24', 'sIOeO9', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('25', '25', 'I3KYio', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('26', '26', '3nMSxn', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('27', '27', 'mn8fwF', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('28', '28', '2qFeK5', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('29', '29', 'ttRfkE', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('30', '30', 'hSQ9AZ', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('31', '31', 'Ni8cNS', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('32', '32', 'arQZrG', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('33', '33', 'yH9laR', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('34', '34', 'oVsVZ1', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('35', '35', 'W4xUkb', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('36', '36', 'xjQG5H', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('37', '37', 'ei5ZAj', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('38', '38', 'zKBZxO', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('39', '39', 'v6t7Lv', '0', '0,', '1478693351', '0');

-- ----------------------------
-- Table structure for communities
-- ----------------------------
DROP TABLE IF EXISTS `communities`;
CREATE TABLE `communities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '社区编号',
  `title` varchar(100) NOT NULL COMMENT '社区标题',
  `slogan` varchar(500) DEFAULT NULL COMMENT '社区标语',
  `addtime` int(11) NOT NULL COMMENT '创建时间',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `hide` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否仅自己可见。1仅自己可见',
  `examineuser` text COMMENT '需要审核的会员加入请求列表，逗号分隔',
  `search` tinyint(4) NOT NULL DEFAULT '1' COMMENT '不可见时允许搜索社区并加入。1允许0禁止',
  `admins` varchar(200) DEFAULT NULL COMMENT '社区管理员编号列表，逗号分隔',
  `examinepost` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否开启新帖审核。1审核0不审核',
  `membernum` int(11) NOT NULL DEFAULT '0' COMMENT '成员数量',
  `members` text COMMENT '成员编号列表，逗号分隔',
  `invitation` varchar(500) DEFAULT NULL COMMENT '想邀请的加入的用户编号列表，逗号分隔',
  `picid` int(11) DEFAULT '1' COMMENT '社区图片编号',
  `describe` text COMMENT '社区描述',
  `linkid` varchar(500) DEFAULT NULL COMMENT '链接编号列表，逗号分隔',
  `typeid` varchar(300) DEFAULT NULL COMMENT '类别编号列表，逗号分隔',
  `sqjr` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '1申请加入，0加入，',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of communities
-- ----------------------------
INSERT INTO `communities` VALUES ('1', 'Naruto', 'Naruto', '1479955161', '8', '0', null, '1', '100,1,2,3', '0', '2', '9,14,', null, '78', '', null, '2', '0');
INSERT INTO `communities` VALUES ('27', 'Transformers', 'Till all are one!', '1479954378', '8', '0', null, '1', null, '0', '1', '16,', null, '74', null, null, null, '0');
INSERT INTO `communities` VALUES ('28', 'Landscape', 'Learning  the Natural World', '1479954870', '8', '0', null, '1', null, '0', '2', '9,17,', null, '77', null, null, null, '0');
INSERT INTO `communities` VALUES ('29', 'Anime', 'Welcome to our world!', '1479955821', '9', '0', null, '1', null, '0', '1', '15,', null, '80', null, null, null, '0');
INSERT INTO `communities` VALUES ('30', 'I was bored and ', 'I was bored and started watching WataMote', '1479956044', '9', '0', null, '1', null, '0', '0', null, null, '82', null, null, null, '0');
INSERT INTO `communities` VALUES ('31', '这是我的第一个社群', '这是我的第一个社群', '1479960311', '12', '0', null, '1', null, '0', '1', '18,', null, '94', null, null, null, '0');

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文件编号',
  `name` varchar(100) DEFAULT NULL COMMENT '文件名',
  `extension` varchar(100) DEFAULT NULL COMMENT '文件扩展名',
  `userid` int(11) NOT NULL COMMENT '所属用户编号',
  `path` varchar(300) DEFAULT NULL COMMENT '文件保存路径',
  `state` tinyint(2) NOT NULL DEFAULT '1' COMMENT '文件状态。1正常0回收站',
  `addtime` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of files
-- ----------------------------
INSERT INTO `files` VALUES ('1', '1', '', '1', '/images/sqmrbg.jpg', '1', '2343354');
INSERT INTO `files` VALUES ('2', '2', null, '2', '/images/2.jpg', '1', '3423');
INSERT INTO `files` VALUES ('3', '3', null, '4', '/images/3.jpg', '1', '32432423');
INSERT INTO `files` VALUES ('4', '4', null, '5', '/images/5.jpg', '1', '43545');
INSERT INTO `files` VALUES ('5', '5', null, '6', '/images/6.jpg', '1', '345465');
INSERT INTO `files` VALUES ('6', null, null, '7', '/images/1.jpg', '1', null);
INSERT INTO `files` VALUES ('7', null, null, '8', '/images/1479817635AkcUxw.jpg', '1', null);
INSERT INTO `files` VALUES ('8', null, null, '9', '/images/1.jpg', '1', null);
INSERT INTO `files` VALUES ('9', null, null, '8', '/images/1.jpg', '1', null);
INSERT INTO `files` VALUES ('10', null, null, '1', '/images/1.jpg', '1', null);
INSERT INTO `files` VALUES ('11', null, null, '2', '/images/1.jpg', '1', null);
INSERT INTO `files` VALUES ('12', null, null, '8', '/images/1479456790QaBi9z.jpg', '1', null);
INSERT INTO `files` VALUES ('13', null, null, '8', '/images/1479456925hfYmgg.jpg', '1', null);
INSERT INTO `files` VALUES ('14', null, null, '8', '/images/14794582348sHPBA.jpg', '1', null);
INSERT INTO `files` VALUES ('15', null, null, '8', '/images/1479458405nsNxI5.jpg', '1', null);
INSERT INTO `files` VALUES ('16', null, null, '8', '/images/1479458472A07OBA.jpg', '1', null);
INSERT INTO `files` VALUES ('17', null, null, '8', '/images/1479458728xLa6rV.jpg', '1', null);
INSERT INTO `files` VALUES ('18', null, null, '8', '/images/1479459454NY2lfW.jpg', '1', null);
INSERT INTO `files` VALUES ('19', null, null, '8', '/images/14795362140NYsKk.jpg', '1', null);
INSERT INTO `files` VALUES ('20', null, null, '8', '/images/1479460353v2KcVz.jpg', '1', null);
INSERT INTO `files` VALUES ('21', null, null, '8', '/images/1479466379LP4dbd.jpg', '1', null);
INSERT INTO `files` VALUES ('22', null, null, '8', '/images/1479536072kwS6SC.jpg', '1', null);
INSERT INTO `files` VALUES ('23', null, null, '8', '/images/1479909777UONfeB.jpg', '1', null);
INSERT INTO `files` VALUES ('24', null, null, '9', '/images/14797836159KI63W.jpg', '1', null);
INSERT INTO `files` VALUES ('25', null, null, '9', '/images/1479783669oj3g19.jpg', '1', null);
INSERT INTO `files` VALUES ('26', null, null, '9', '/images/1479783697Rz1P8g.jpg', '1', null);
INSERT INTO `files` VALUES ('27', null, null, '9', '/images/14797837429nuzCD.jpg', '1', null);
INSERT INTO `files` VALUES ('28', null, null, '9', '/images/1479783841cxmrNG.jpg', '1', null);
INSERT INTO `files` VALUES ('29', null, null, '9', '/images/1479784007JgUCM8.jpg', '1', null);
INSERT INTO `files` VALUES ('30', null, null, '9', '/images/1479784148RzQVCe.jpg', '1', null);
INSERT INTO `files` VALUES ('31', null, null, '9', '/images/1479784843Wy1HcV.jpg', '1', '1479784843');
INSERT INTO `files` VALUES ('32', null, null, '9', '/images/1479784902UkkHMA.jpg', '1', '1479784902');
INSERT INTO `files` VALUES ('33', null, null, '9', '/images/1479788057vuYEhs.jpg', '1', '1479785674');
INSERT INTO `files` VALUES ('34', null, null, '8', '/images/1479955128o103wP.jpg', '1', '1479817603');
INSERT INTO `files` VALUES ('35', null, null, '8', '/images/1479817670rIcxAQ.jpg', '1', '1479817670');
INSERT INTO `files` VALUES ('36', null, null, '8', '/images/1479827387pSPWV0.jpg', '1', '1479827387');
INSERT INTO `files` VALUES ('37', null, null, '8', '/images/1479827427seYSvl.jpg', '1', '1479827427');
INSERT INTO `files` VALUES ('38', null, null, '8', '/images/1479827551fcdF6B.jpg', '1', '1479827552');
INSERT INTO `files` VALUES ('39', null, null, '8', '/images/14798277702wYXzh.jpg', '1', '1479827770');
INSERT INTO `files` VALUES ('40', null, null, '8', '/images/1479861525ugv0ng.jpg', '1', '1479861525');
INSERT INTO `files` VALUES ('41', '41', 'image/jpeg', '8', '/files/2016/11/14/8/41.jpg', '1', '1479862782');
INSERT INTO `files` VALUES ('42', null, null, '8', '/images/1479867702RuF8C5.jpg', '1', '1479867702');
INSERT INTO `files` VALUES ('43', '43', 'image/jpeg', '8', '/files/2016/11/14/8/43.jpg', '1', '1479873276');
INSERT INTO `files` VALUES ('44', '44', 'image/jpeg', '8', '/files/2016/11/14/8/44.jpg', '1', '1479873277');
INSERT INTO `files` VALUES ('45', '45', 'image/jpeg', '8', '/files/2016/11/14/8/45.jpg', '1', '1479873277');
INSERT INTO `files` VALUES ('46', '46', 'image/jpeg', '8', '/files/2016/11/14/8/46.jpg', '1', '1479873278');
INSERT INTO `files` VALUES ('47', null, null, '8', '/images/1479892359NkTCtX.jpg', '1', '1479892359');
INSERT INTO `files` VALUES ('48', null, null, '8', '/images/14799102057DdKVK.jpg', '1', '1479899323');
INSERT INTO `files` VALUES ('49', null, null, '8', '/images/1479903825EZ4nJU.jpg', '1', '1479903825');
INSERT INTO `files` VALUES ('50', null, null, '8', '/images/147990419505FEac.jpg', '1', '1479904195');
INSERT INTO `files` VALUES ('51', null, null, '8', '/images/14799162222W2XKn.jpg', '1', '1479904452');
INSERT INTO `files` VALUES ('52', null, null, '8', '/images/1479909932RDJAyh.jpg', '1', null);
INSERT INTO `files` VALUES ('53', null, null, '8', '/images/1479910991YpoBO8.jpg', '1', null);
INSERT INTO `files` VALUES ('54', null, null, '8', '/images/1479912307wmREpP.jpg', '1', '1479912308');
INSERT INTO `files` VALUES ('55', null, null, '8', '/images/1479913516FfWYmx.jpg', '1', '1479913516');
INSERT INTO `files` VALUES ('56', null, null, '8', '/images/14799135203AwLQT.jpg', '1', '1479913520');
INSERT INTO `files` VALUES ('57', null, null, '8', '/images/1479913926l1tKgV.jpg', '1', '1479913926');
INSERT INTO `files` VALUES ('58', null, null, '8', '/images/1479915566xwEimr.jpg', '1', '1479915566');
INSERT INTO `files` VALUES ('59', null, null, '8', '/images/1479917647yOo2rO.jpg', '1', '1479916304');
INSERT INTO `files` VALUES ('60', null, null, '8', '/images/14799174812eOhvr.jpg', '1', '1479917481');
INSERT INTO `files` VALUES ('61', null, null, '8', '/images/14799427394y8Hu8.jpg', '1', '1479942739');
INSERT INTO `files` VALUES ('62', null, null, '8', '/images/14799427674qb8OH.jpg', '1', '1479942767');
INSERT INTO `files` VALUES ('63', null, null, '8', '/images/14799428081x2Z70.jpg', '1', '1479942808');
INSERT INTO `files` VALUES ('64', '64', 'image/jpeg', '8', '/files/2016/11/14/8/64.jpg', '1', '1479952198');
INSERT INTO `files` VALUES ('65', '65', 'image/jpeg', '8', '/files/2016/11/14/8/65.jpg', '1', '1479952291');
INSERT INTO `files` VALUES ('66', '66', 'image/jpeg', '8', '/files/2016/11/14/8/66.jpg', '1', '1479952363');
INSERT INTO `files` VALUES ('67', '67', 'image/jpeg', '8', '/files/2016/11/14/8/67.jpg', '1', '1479952535');
INSERT INTO `files` VALUES ('68', '68', 'image/jpeg', '8', '/files/2016/11/14/8/68.jpg', '1', '1479952887');
INSERT INTO `files` VALUES ('69', '69', 'image/jpeg', '8', '/files/2016/11/14/8/69.jpg', '1', '1479952979');
INSERT INTO `files` VALUES ('70', '70', 'image/jpeg', '8', '/files/2016/11/14/8/70.jpg', '1', '1479953188');
INSERT INTO `files` VALUES ('71', '71', 'image/jpeg', '8', '/files/2016/11/14/8/71.jpg', '1', '1479953323');
INSERT INTO `files` VALUES ('72', null, null, '8', '/images/1479953742jBVeTx.jpg', '1', '1479953742');
INSERT INTO `files` VALUES ('73', '73', 'image/jpeg', '8', '/files/2016/11/14/8/73.jpg', '1', '1479954027');
INSERT INTO `files` VALUES ('74', null, null, '8', '/images/1479954377l962G5.jpg', '1', '1479954377');
INSERT INTO `files` VALUES ('75', '75', 'image/jpeg', '8', '/files/2016/11/14/8/75.jpg', '1', '1479954517');
INSERT INTO `files` VALUES ('76', null, null, '8', '/images/1479954869Ba4RKj.jpg', '1', '1479954613');
INSERT INTO `files` VALUES ('77', null, null, '8', '/images/14799548250ea6j3.jpg', '1', '1479954825');
INSERT INTO `files` VALUES ('78', null, null, '8', '/images/1479955161iiDGsJ.jpg', '1', '1479954957');
INSERT INTO `files` VALUES ('79', null, null, '8', '/images/1479955243zRWh4B.jpg', '1', '1479955243');
INSERT INTO `files` VALUES ('80', null, null, '9', '/images/1479955821qEdM0e.jpg', '1', '1479955821');
INSERT INTO `files` VALUES ('81', null, null, '9', '/images/1479955884RdW2J5.jpg', '1', '1479955884');
INSERT INTO `files` VALUES ('82', null, null, '9', '/images/1479956043bYwlKg.jpg', '1', '1479956043');
INSERT INTO `files` VALUES ('83', null, null, '9', '/images/1479958307gNX8FL.jpg', '1', '1479956453');
INSERT INTO `files` VALUES ('84', null, null, '9', '/images/1479956529Fh40c2.jpg', '1', null);
INSERT INTO `files` VALUES ('85', null, null, '9', '/images/14799582786JgnEp.jpg', '1', null);
INSERT INTO `files` VALUES ('86', null, null, '9', '/images/1479957747lrdBfK.jpg', '1', null);
INSERT INTO `files` VALUES ('87', null, null, '9', '/images/1479957878FRNwkh.jpg', '1', null);
INSERT INTO `files` VALUES ('88', null, null, '9', '/images/1479957882CFu9Bb.jpg', '1', null);
INSERT INTO `files` VALUES ('89', null, null, '9', '/images/1479957889MbWSxo.jpg', '1', null);
INSERT INTO `files` VALUES ('90', null, null, '9', '/images/1479958072xHEaG6.jpg', '1', null);
INSERT INTO `files` VALUES ('91', null, null, '9', '/images/1479958791GS2L6j.jpg', '1', null);
INSERT INTO `files` VALUES ('92', null, null, '9', '/images/14799588877dRHIo.jpg', '1', null);
INSERT INTO `files` VALUES ('93', null, null, '9', '/images/1479959079J5YE4a.jpg', '1', null);
INSERT INTO `files` VALUES ('94', null, null, '12', '/images/147995992377tUcf.jpg', '1', '1479959923');
INSERT INTO `files` VALUES ('95', null, null, '12', '/images/1479964226eV8J3m.jpg', '1', '1479960311');
INSERT INTO `files` VALUES ('96', null, null, '12', '/images/1479960581OXpXiJ.jpg', '1', null);
INSERT INTO `files` VALUES ('97', null, null, '12', '/images/1479960586p4WfCB.jpg', '1', null);
INSERT INTO `files` VALUES ('98', null, null, '12', '/images/1479960660PkjNSp.jpg', '1', null);
INSERT INTO `files` VALUES ('99', null, null, '12', '/images/1479960841CfmpfQ.jpg', '1', null);
INSERT INTO `files` VALUES ('100', null, null, '12', '/images/14799609928bSxau.jpg', '1', null);
INSERT INTO `files` VALUES ('101', null, null, '12', '/images/1479964282KsASNK.jpg', '1', null);
INSERT INTO `files` VALUES ('102', '102', 'image/jpeg', '13', '/files/2016/11/24/13/102.jpg', '1', '1479998408');
INSERT INTO `files` VALUES ('103', '103', 'image/jpeg', '13', '/files/2016/11/24/13/103.jpg', '1', '1479998496');
INSERT INTO `files` VALUES ('104', '104', 'image/jpeg', '13', '/files/2016/11/24/13/104.jpg', '1', '1479998507');
INSERT INTO `files` VALUES ('105', '105', 'image/jpeg', '14', '/files/2016/11/24/14/105.jpeg', '1', '1479998698');
INSERT INTO `files` VALUES ('106', '106', 'image/jpeg', '14', '/files/2016/11/24/14/106.jpg', '1', '1479998753');
INSERT INTO `files` VALUES ('107', '107', 'image/jpeg', '14', '/files/2016/11/24/14/107.jpg', '1', '1479998761');
INSERT INTO `files` VALUES ('108', '108', 'image/jpeg', '15', '/files/2016/11/24/15/108.jpg', '1', '1479998935');
INSERT INTO `files` VALUES ('109', '109', 'image/jpeg', '16', '/files/2016/11/24/16/109.jpg', '1', '1479999080');
INSERT INTO `files` VALUES ('110', '110', 'image/jpeg', '16', '/files/2016/11/24/16/110.jpg', '1', '1479999105');
INSERT INTO `files` VALUES ('111', '111', 'image/jpeg', '16', '/files/2016/11/24/16/111.jpg', '1', '1479999118');
INSERT INTO `files` VALUES ('112', '112', 'image/jpeg', '17', '/files/2016/11/24/17/112.png', '1', '1479999293');
INSERT INTO `files` VALUES ('113', '113', 'image/jpeg', '17', '/files/2016/11/24/17/113.jpg', '1', '1479999343');
INSERT INTO `files` VALUES ('114', '114', 'image/jpeg', '17', '/files/2016/11/24/17/114.jpg', '1', '1479999358');
INSERT INTO `files` VALUES ('115', '115', 'image/jpeg', '18', '/files/2016/11/24/18/115.jpg', '1', '1479999439');
INSERT INTO `files` VALUES ('116', '116', 'image/jpeg', '18', '/files/2016/11/24/18/116.png', '1', '1479999473');
INSERT INTO `files` VALUES ('117', '117', 'image/jpeg', '18', '/files/2016/11/24/18/117.jpg', '1', '1479999484');
INSERT INTO `files` VALUES ('118', '118', 'image/jpeg', '19', '/files/2016/11/24/19/118.jpg', '1', '1479999590');
INSERT INTO `files` VALUES ('119', '119', 'image/jpeg', '19', '/files/2016/11/24/19/119.jpg', '1', '1479999598');
INSERT INTO `files` VALUES ('120', '120', 'image/jpeg', '19', '/files/2016/11/24/19/120.jpg', '1', '1479999683');
INSERT INTO `files` VALUES ('121', '121', 'image/jpeg', '20', '/files/2016/11/24/20/121.jpg', '1', '1479999782');
INSERT INTO `files` VALUES ('122', '122', 'image/jpeg', '20', '/files/2016/11/24/20/122.jpg', '1', '1479999790');
INSERT INTO `files` VALUES ('123', '123', 'image/jpeg', '13', '/files/2016/11/24/13/123.jpg', '1', '1480000364');
INSERT INTO `files` VALUES ('124', '124', 'image/jpeg', '13', '/files/2016/11/24/13/124.jpg', '1', '1480000459');
INSERT INTO `files` VALUES ('125', '125', 'image/jpeg', '13', '/files/2016/11/24/13/125.jpg', '1', '1480000607');
INSERT INTO `files` VALUES ('126', null, null, '13', '/images/1480004444K24oR7.jpg', '1', null);

-- ----------------------------
-- Table structure for links
-- ----------------------------
DROP TABLE IF EXISTS `links`;
CREATE TABLE `links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '链接编号',
  `name` varchar(100) NOT NULL COMMENT '网站名称',
  `url` varchar(300) NOT NULL COMMENT '网站网址',
  `picture` varchar(300) DEFAULT NULL COMMENT '图片保存路径',
  `addtime` int(10) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of links
-- ----------------------------

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` int(10) unsigned NOT NULL COMMENT '通知编号',
  `userid` int(11) NOT NULL COMMENT '所属用户编号',
  `addtime` int(11) NOT NULL,
  `launchuser` int(11) NOT NULL COMMENT '发起的用户编号',
  `postid` int(11) NOT NULL COMMENT '帖子编号',
  `commentid` int(11) NOT NULL COMMENT '评论编号',
  `vateid` int(11) NOT NULL COMMENT '投票编号',
  `collid` int(11) NOT NULL COMMENT '收藏集编号',
  `commid` int(11) NOT NULL COMMENT '社区编号',
  `type` varchar(255) DEFAULT NULL COMMENT '事件类型',
  `explain` text COMMENT '事件说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '帖子编号',
  `title` varchar(100) DEFAULT NULL COMMENT '帖子标题',
  `abstract` varchar(500) DEFAULT NULL COMMENT '帖子摘要',
  `content` text COMMENT '帖子内容',
  `addtime` int(10) unsigned NOT NULL COMMENT '添加时间',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `type` tinyint(2) unsigned NOT NULL DEFAULT '1' COMMENT '帖子类型。1文字2图片3链接4投票5文章',
  `picid` varchar(500) DEFAULT NULL COMMENT '图片编号列表，逗号分隔',
  `fileid` varchar(300) DEFAULT NULL COMMENT '附件编号列表，逗号分隔',
  `linkid` varchar(300) DEFAULT NULL COMMENT '链接编号列表，逗号分隔',
  `voteid` varchar(500) DEFAULT NULL COMMENT '投票编号列表，逗号分隔',
  `collid` int(10) unsigned DEFAULT NULL COMMENT '所属收藏集编号',
  `commid` int(11) DEFAULT NULL COMMENT '所属社区编号',
  `commtypeid` int(11) DEFAULT NULL COMMENT '所属社区类别编号',
  `circleid` varchar(500) DEFAULT NULL COMMENT '有权查看的圈子编号列表，逗号分隔',
  `peopleid` varchar(500) DEFAULT NULL COMMENT '有权查看的用户编号列表，逗号分隔',
  `comments` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '评论的数量',
  `nocomment` tinyint(2) NOT NULL DEFAULT '1' COMMENT '禁止评论 1允许 0禁止',
  `noshare` tinyint(2) NOT NULL DEFAULT '1' COMMENT '禁止分享 1允许 0禁止',
  `likes` int(11) NOT NULL DEFAULT '0' COMMENT '喜欢的数量',
  `likeuserid` text COMMENT '喜欢的用户编号列表，逗号分隔',
  `shares` int(11) NOT NULL DEFAULT '0' COMMENT '分享的数量',
  `fixed` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否固定到顶部 1固定 0禁',
  `state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '帖子状态。1正常0回收站2待审核',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('31', null, null, null, '1479952227', '1', '2', '64', null, null, null, null, null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('32', null, null, '夏の思い出\n明石海峡の日没\n\nSunset Glow\nAkashi Strait\nHyogo, Japan\n\n+Canon EOS 5DsR\n- Canon EF 70-200mm F/4L IS USM', '1479952310', '3', '2', '65', null, null, null, null, null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('33', null, null, null, '1479952373', '2', '2', '66', null, null, null, null, null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('34', null, null, '话说二郎神与众仙斗法，将哮天犬变成玉皇大帝，就连王母也分辨不出。王母唯恐闹出事端，只好向佛祖求教该如何辨认？\n佛祖说：江山易改本性难移，样貌可以幻化，本性不会改变。\n你让嫦娥赤身裸体端包子给他俩送去，两眼直勾勾看女人的那个就是老皇帝，只知道吃包子的那个就是狗！', '1479952545', '8', '2', '67', null, null, null, null, null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('35', null, null, 'Poor Blue....', '1479952897', '2', '2', '68', null, null, null, null, null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('36', null, null, '【有意思的几个典故】  \n1，愚公移山。\n先不说能不能把山移掉，先来谈这个愚公。\n山挡路，是搬家容易，还是移山容易？\n把自己家搬到一马平川，天堂苏杭，是不是更容易和划来。\n非要和山搏斗，还子子孙孙无穷无尽。\n谁要摊这么个愚蠢的爷爷真是倒了八辈子的霉。\n谁要是号召民众学习愚公精神，那真是蠢的驴一样的。\n2，铁棒成针。\n自小，就在语文课本里学这个励志的故事。\n只要功夫深，铁杵磨成针。\n难道不会去把铁棒卖掉，买它几根针回来。\n而且了，就是磨成针，针眼用嘴吹个眼吗？\n猪一样的逻辑，猪一样的做法。', '1479952989', '8', '2', '69', null, null, null, null, null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('37', null, null, 'So, who do you choose?﻿', '1479953199', '3', '2', '70', null, null, null, null, null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('38', null, null, '你不装逼我们还是好朋友！！！！！！！！！！！！！！！！！！！！！！！', '1479953362', '8', '2', '71', null, null, null, null, null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('39', null, null, null, '1479953428', '4', '2', '64,66,68,69,71', null, null, null, null, null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('40', null, null, '突然看到follow 滚滚红尘Panda 的人数已经超过 5000 了，还是很震惊。\n\n好吧，这么多朋友来做客，我看有必要解释一下“滚滚红尘”的意思。这里的“滚滚”，就是指熊猫。2008年5月12日汶川地震之后，天涯八卦论坛上有人发帖担心大熊猫的安全，其中有个油菜花的童鞋回复说：“它们一定被震得滚来滚去滚来滚去”。', '1479954043', '1', '2', '73', null, null, null, '59', null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('41', null, null, '\"I\'ve done far worse to far bigger\"﻿', '1479954533', '8', '2', '75', null, null, null, null, '27', null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('42', null, null, '就问你酷不酷？？？？？？？？？？？？？？', '1479954614', '3', '1', '76', null, null, null, null, '27', null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('43', null, null, 'Mears Peak - 13,496\'\nSan Juan Mountains, CO\nOur peace shall stand as firm as rocky mountains. \n~ William Shakespeare', '1479954957', '8', '1', '78', null, null, null, null, '28', null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('44', null, null, 'I lllllllllll Yamato Face ﻿', '1479955243', '2', '1', '78', null, null, null, null, '1', null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('45', null, null, 'A bit reminder....\n\nIn this community, spamming it\'s not just about making at least a meter long of post in less then 5 minutes. It\'s also applied to people who pasting links in comments that\'s unrelated to post. Sometimes it contain ads, video links or even invites.', '1479955884', '9', '1', '80', null, null, null, null, '29', null, null, null, '2', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('46', null, null, '为什么Anastasia Lin应该赢得世界小姐皇冠\n\n本文译自Benedict Rogers于11月22日发表在《赫芬顿邮报》英国网站上的博客文章，题目为“为什么Anastasia Lin应该赢得世界小姐”。', '1479998423', '13', '2', '102', null, null, null, null, null, null, null, null, '1', '1', '1', '2', '13,14', '0', '0', '1');
INSERT INTO `posts` VALUES ('47', null, null, '最好的大学在培养比贪官更可怕的人\n在中国的大学里，包括最好的北大、清华，都正在培养一群20几岁就已经“老奸巨猾”的学生，他们高智商，世俗，老到，善于表演，懂得配合，更善于利用体制达到自己的目的。', '1479998705', '14', '2', '105', null, null, null, null, null, null, null, null, '0', '1', '1', '1', '14', '0', '0', '1');
INSERT INTO `posts` VALUES ('48', null, null, 'A  child\'s  personal  bodyguard  and  their  footbal  team.  \nNo wonder  she  feels  so  secured  and  happy.\nWhat  more  could  you  ask  for. \nLucky  girl!﻿', '1479998940', '15', '2', '108', null, null, null, null, null, null, null, null, '1', '1', '1', '2', '15,19', '0', '0', '1');
INSERT INTO `posts` VALUES ('49', null, null, '.  .  .  .   A  CHILD\'S   INNOCENCE  IS  GOLDEN\n\nA  comfortable  linen  and bed  for  puppies = $100.00\n\nA  Thomas The Tank themed  bedroom  suite \nfor  the boy   =  $5,000.00', '1479999087', '16', '2', '109', null, null, null, null, null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('50', null, null, '〖微博谈〗20161124\n钟南山院士说，别拿雾霾开玩笑了，它是一级致癌物质。资料显示：我们一个肺有3亿个肺泡，80个Pm2.5微粒可以堵死一个肺泡，我们严重污染的生活环境Pm2.5是1155单位，一年堵死三千万个肺泡！3年堵死三分之一个肺！所以预测几年后中国将会肺癌井喷，这并不是耸人听闻！然而，国人很淡定，舞照跳，拳照打。', '1479999300', '17', '2', '112', null, null, null, null, null, null, null, null, '0', '1', '1', '0', null, '0', '0', '1');
INSERT INTO `posts` VALUES ('51', null, null, 'The Labrador Retriever, also Labrador, is a type of retriever-gun dog. The Labrador is one of the most popular breeds of dog in the United Kingdom and the United States. Wikipedia\nScientific name: Canis familiaris', '1479999444', '18', '2', '115', null, null, null, null, null, null, null, null, '1', '1', '1', '1', '18', '0', '0', '1');
INSERT INTO `posts` VALUES ('52', null, null, 'The Labrador Retriever, also Labrador, is a type of retriever-gun dog. The Labrador is one of the most popular breeds of dog in the United Kingdom and the United States. Wikipedia\nScientific name: Canis familiaris', '1479999687', '19', '2', '120', null, null, null, null, null, null, null, null, '0', '1', '1', '2', '19,20', '0', '0', '1');
INSERT INTO `posts` VALUES ('53', null, null, '邓小平说的这么清楚，邓的家族有多少亿万富翁？“六四”之后，中国一直走在邪路上，中共嘴上说着社会主义，手上干着官僚资本主义。', '1479999854', '20', '2', '122', null, null, null, null, null, null, null, null, '0', '1', '1', '1', '20', '0', '0', '1');
INSERT INTO `posts` VALUES ('54', null, null, '明天峰哥就要审项目了，好紧张！', '1480000464', '13', '2', '124', null, null, null, null, null, null, null, null, '1', '1', '1', '2', '13,14', '0', '0', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `username` varchar(100) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `state` tinyint(2) NOT NULL DEFAULT '2' COMMENT '用户状态。0禁用、1未激活2正常3管理员',
  `picid` int(11) DEFAULT '2' COMMENT '头像图片编号',
  `sex` tinyint(2) NOT NULL DEFAULT '0' COMMENT '性别。0保密1男2女',
  `shield` text COMMENT '被屏蔽的用户编号列表，逗号分隔',
  `ignore` text COMMENT '被忽略的用户编号列表，逗号分隔',
  `followusers` text COMMENT '关注的用户编号列表，逗号分隔',
  `dynamic` tinyint(4) NOT NULL DEFAULT '2' COMMENT '首页讯息串中的讯息数量。0没有1减少2标准3更多',
  `notice` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否获取有关新信息的通知。1获取0不获取',
  `followcoll` text COMMENT '关注的合集编号列表，逗号分隔',
  `followcomm` text COMMENT '关注的社区编号列表，逗号分隔',
  `circle` text COMMENT '我的圈子编号列表，逗号分隔',
  `postnum` int(11) NOT NULL DEFAULT '0' COMMENT '用户发表的帖子数量',
  `background` int(11) DEFAULT NULL COMMENT '背景图片编号',
  `slogan` varchar(500) DEFAULT NULL COMMENT '用户个性宣言',
  `showcoll` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否公开你关注的收藏集 1显示0隐藏',
  `showcomm` text COMMENT '想公开的你收藏的社区编号列表，逗号分隔',
  `visit` int(11) NOT NULL DEFAULT '0' COMMENT '主页被访问次数',
  `created_at` datetime DEFAULT NULL COMMENT '注册时间',
  `nickname` varchar(100) DEFAULT NULL COMMENT '用户昵称',
  `birthday` int(11) DEFAULT NULL COMMENT '生日时间戳',
  `birth` varchar(100) DEFAULT NULL COMMENT '出生地',
  `residence` varchar(100) DEFAULT NULL COMMENT '居住地',
  `introduce` varchar(500) DEFAULT NULL COMMENT '个人简介',
  `token` varchar(100) NOT NULL COMMENT '令牌。忘记密码验证',
  `remember_token` varchar(100) DEFAULT NULL COMMENT '用于存储“记住我”令牌',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '用户更新时间',
  `fans` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'wangbao', '$2y$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '1105085970@qq.com', '1', '3', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', null, null, null, null, null, null, '545', 'IBnZQAmWcrBxEcp05vHqNpA79d802IX30WuGWUKx4o9qcOrZROrl1japrKEQ', '2016-11-19 14:33:51', null);
INSERT INTO `users` VALUES ('2', 'wangbao1', '$2y$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '11050859701@qq.com', '1', '2', '0', null, null, null, '2', '1', '2,', null, null, '0', null, null, '0', null, '0', null, null, null, null, null, null, '545', 'FUu20lvKudLspJEFuADKOMn1ft8uLntFqWRcegrpTuBroN5NNGJQqHEjYJNj', '2016-11-15 21:07:31', null);
INSERT INTO `users` VALUES ('3', 'peisijia', '$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '1249542668@qq.com', '1', '3', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', null, null, null, null, null, null, '444', 'FUu20lvKudLspJEFuADKOMn1ft8uLntFqWRcegrpTuBroN5NNGJQqHEjYJNj', '2016-11-14 15:40:09', null);
INSERT INTO `users` VALUES ('4', 'fafferf', '$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '2414353415@qq.com', '1', '4', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', null, null, null, null, null, null, '23424', 'FUu20lvKudLspJEFuADKOMn1ft8uLntFqWRcegrpTuBroN5NNGJQqHEjYJNj', '2016-11-24 22:58:46', '7,18');
INSERT INTO `users` VALUES ('5', 'sgrdg', '$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '2413423@ff.com', '1', '5', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', null, null, null, null, null, null, '555', 'FUu20lvKudLspJEFuADKOMn1ft8uLntFqWRcegrpTuBroN5NNGJQqHEjYJNj', '2016-11-24 22:53:14', '16');
INSERT INTO `users` VALUES ('6', 'psjpsjpsj', '$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '123456789@qq.com', '1', '6', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', '2016-11-13 21:00:24', null, null, null, null, null, '22FMRDeGCW1w70M3pZPxzeCczSlKyP3SnfT9DTDA4Y5QavFWwU', null, '2016-11-14 19:44:47', null);
INSERT INTO `users` VALUES ('7', 'maomao', '$2y$10$wfskfvC00Va7XbxXzK3iruxlHRNUUsTskr5VXTRY.VUbna67IhiEW', null, '1234567@qq.com', '1', '2', '0', null, null, '11,10,12,9,4', '2', '1', null, null, '3,4,5,6,7', '0', null, null, '0', null, '0', '2016-11-13 22:01:00', null, null, null, null, null, 'Vrd4IeRlyw9kpaMqQNmXvBPDOyQfKWSdY33OgOinCinxTnOMDt', 'hJYKpBrnXLRh1Nnx3t92BuUoXpRrldFDTvr2dFdOY2lJEMWXPx6fwCS5cyzw', '2016-11-24 22:42:26', '13');
INSERT INTO `users` VALUES ('8', 'wang', '$2y$10$8zINeDd5GfRH2R97ljHKQ.UUg9OqSthCnFD2ovHPasqBNfyLWGaDu', null, '666@qq.com', '1', '6', '0', null, null, null, '2', '1', '1000,33,3,2,', '1000,4,3,', null, '0', null, null, '0', null, '0', '2016-11-14 14:35:34', null, null, null, null, null, '0RsXhCG4ANs5SpkNkgy9aqhEjpFQiPJ7kddYcgIbVmTMxJTtF8', 'c3zh3q2B4EbAdNPqTTaumwbhVmFGz3Sqbc0AXoyvxRzFJBXsggpsjdejomW3', '2016-11-24 22:53:12', '14,15,16');
INSERT INTO `users` VALUES ('9', 'heihei', '$2y$10$KkcMN1/TLL2f5KSJbOTht.uQJCHkk4HyGFVHCCbOOZ.mCQlvjoFd.', null, '888@qq.com', '1', '2', '0', null, null, '12,11', '2', '1', '1,', '2,1,28,', null, '0', null, null, '0', null, '0', '2016-11-21 09:05:23', null, null, null, null, null, 'XCRyj01CzTdjdyIPVDwUengPDlcey03gjiQvabOSU1SV24vCQD', 'lIeR8Q32KxX2x7uWzwiybugBnDREpnZv1NOnndFP9vq0BtopXayr2EmW6fkZ', '2016-11-24 22:53:13', '7,16');
INSERT INTO `users` VALUES ('10', 'wang1', '$2y$10$zyX82dvvrojy/k8ebbrQg.Mc1wnOyem.aXylUf937jryqTbO0QVGW', null, '666666@qq.com', '2', '2', '1', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', '2016-11-21 17:09:14', null, null, null, null, null, '1FkTjrEiR5QxQrzgtDsIi0DaXZhoA8a4GiRMpBMEjPHSDECgWA', '5DRlrNvh57QaX6hlt8DLZfKlq0ZgP1J7FbsF08L6MdMWmL5WxGSTvmECZed4', '2016-11-24 22:42:24', '7,13');
INSERT INTO `users` VALUES ('11', '888', '$2y$10$HPgTpPRI2oI74DBfC/Lc/uYIZ8sls2htZK3sKdnT9APc7Q/4DM2dS', null, '6666@qq.com', '2', '2', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', '2016-11-23 16:17:26', null, null, null, null, null, 'L4T2OLNi8O7HAaw1iNIoDQONFyqmc4YubJ0mqbiWIEZsfJF2tc', '1mP6U6GweEZEckixCexEMextjFWVjL8k0QEDXTmkLpUBnoPpdLNTiHG9GB5E', '2016-11-24 22:49:35', '9,7,13,15');
INSERT INTO `users` VALUES ('12', 'wrh', '$2y$10$yencd4640jfk9dKOyv4zaeaDAhlEoaDCiodHPHJb9zPO3TJ1ogj/W', null, '123@qq.com', '2', '2', '0', null, null, null, '2', '1', '60,', null, null, '0', null, null, '0', null, '0', '2016-11-24 11:56:57', null, null, null, null, null, 'NibY4OrYOqR5TFiFy4UdI8h6pd0TawOOzdZgtu1cVtQox7k2tM', 'sEUa2PdAKwGJk8ndeVLreXiEgut641oIyr4daEGxS4cH4hEQ7TMhEP6BGljv', '2016-11-24 22:49:34', '9,7,13,14,15');
INSERT INTO `users` VALUES ('13', 'jiajia', '$2y$10$aOOW8sJYylTo0u6Rm1c9XevZM2M2cSm7MnJzj1jrIQZn8c9t6v8L6', '15111111111', '123456@qq.com', '4', '103', '2', null, null, '12,11,10,7,19,18,20', '2', '1', '59,60,62,66,61,', null, '8,9', '0', '125', '佳佳', '0', null, '0', '2016-11-24 22:38:05', '佳佳', null, null, null, '对我来说，有一项角逐胜过二者，那就是本周末开始的世界小姐总决赛。', '14eBGst06UE5fXA4RW1fllJV1Q8syKoGQCXi54apbQxbVDX1bT', 'pGpnp8GV8fBTz3AoCRa7d2Ac32IVJKGpWHo9PH1bY9il1OPJMwWLgL3FydDg', '2016-11-25 00:21:39', '14,15,16,17,18,19');
INSERT INTO `users` VALUES ('14', 'aaa', '$2y$10$pYb5UtUjJofAIL2zB.Jjx.x0t8MYDFc/7uR2E9kwGHujmswTxRqwC', '13111111111', 'aaa@qq.com', '0', '106', '1', null, null, '13,12,8', '2', '1', null, '1,', null, '0', '107', 'aaa', '0', null, '0', '2016-11-24 22:44:26', 'aaa', null, null, null, '最好的大学在培养比贪官更可怕的人\n', 't5fq8AlMlLTttUKPqiEAPQYEhHONJCf8d90v0U3eNbY8OUFdAn', 'PANQb8tl3fv51ecZVH1fS4369ZZH8hTdjIERKzEt2VrGdcci7KpfVUGRAOgv', '2016-11-24 23:34:06', '15,17,18,19');
INSERT INTO `users` VALUES ('15', 'bbb', '$2y$10$/YhmkEbeORbvIeCTeWJ3GOKvmnuO4I0edYtRsNIbB7VGRz9omxXQC', '13154444444', 'bbb@qq.com', '2', '2', '0', null, null, '14,13,12,11,8', '2', '1', null, '29,', null, '0', null, null, '0', null, '0', '2016-11-24 22:48:00', null, null, null, null, null, 'QtdvamWO9LK0q5S3s308WsNhzmtpOcgZ5zIOmMEQgoLxy03kzK', 'WcuMJefLG40fB4SUIUCyLhFqQKjxYqIWvmkacZVIE4Yf1o8Fh7atWO5iRBIS', '2016-11-25 00:15:24', null);
INSERT INTO `users` VALUES ('16', 'ccc', '$2y$10$M1mVwZbumo8VNq/J5/JcU.1k28hfATDPiWzEQmKIwcJgm6ktDhMGC', '13122222222', 'ccc@qq.com', '2', '110', '0', null, null, '13,8,9,5', '2', '1', null, '27,', '10', '0', '111', 'ccc', '0', null, '0', '2016-11-24 22:50:45', 'ccc', null, null, null, ' A  CHILD\'S   INNOCENCE  IS  GOLDEN\n\n', 'UgqcSN8skhYvda0LdiZSutD79E0Qb6uYL25lxQCh33QHQzIRS7', 'R6a9gmGOYhCEMF8jC62AhDytDFUlafxWUKYBRcmhUNx70VxunJDxNu2nQyUS', '2016-11-24 22:56:12', '17');
INSERT INTO `users` VALUES ('17', 'ddd', '$2y$10$qq9gx6chV8YOo8DK9edxZ.1m/GgdscLxK2QbdkyYfvmxYtiOpYBdG', '13144444444', 'ddd@qq.com', '2', '113', '0', null, null, '16,14,13', '2', '1', null, '28,', null, '0', '114', 'ddd', '0', null, '0', '2016-11-24 22:54:12', 'ddd', null, null, null, '〖微博谈〗\n', 'cQyyszA58FupxTMR5bkw8TQrulqbKukgcy3yE31EVb8IJdtZ8v', 'xs6WTFUK6ddGleLlkHb4WVDAPkbi5xcGUtkiiobs2JXHlqMjkiqC8ReJIfy5', '2016-11-24 22:56:29', null);
INSERT INTO `users` VALUES ('18', 'eee', '$2y$10$PSLEAwzgGg/4Xsk78m/68.inITZCcb5EJNeeX1yZUI77Jw6jm3QAa', '15122222222', 'eee@qq.com', '2', '116', '2', null, null, '14,13,4', '2', '1', null, '31,', null, '0', '117', 'eee', '0', null, '0', '2016-11-24 22:56:49', 'eee', null, null, null, 'The Labrador Retriever, also Labrador, is a type of retriever-gun dog. The Labrador is ', 'EjW5UCYHS0R1D5jldJmZbJk4VyjodPHFO5qDbsv4gA7ixtea58', 'x2nHbGYU6VO6rvOnh9VMzkBwgE9C63YdkAygxscbf3z1Q3xPyZXg0G3G1Y5H', '2016-11-24 23:05:03', '13');
INSERT INTO `users` VALUES ('19', 'fff', '$2y$10$k85TAV1Nr7/KNXlgBFyyfOWp4jVh2lNX4bnymwl8wScU1mtQPKtey', '15133333333', 'fff@qq.com', '2', '118', '2', null, null, '13,14', '2', '1', null, null, null, '0', '119', 'fff', '0', null, '0', '2016-11-24 22:59:20', 'fff', null, null, null, 'The Labrador Retriever, also Labrador, is a type of retriever-gun dog. ', '1tJt6auCmcv0tL2rXytzodseuF664XtjxJ7wRgD8mfU9Ov2fX2', 'jyIdT1N2IoQ3cPER5cNAxIfFzmzNzDXZNmTRsGFmVzluri1Z6ucZlxvL2obq', '2016-11-24 23:05:02', '13');
INSERT INTO `users` VALUES ('20', 'ggg', '$2y$10$JQrs/.DI0Aj6DnWOUNlpCO2U80D0LHFSxMpOHurM3iiVg6ONja8TG', '18111111111', 'ggg@qq.com', '2', '121', '0', null, null, null, '2', '1', null, null, null, '0', '122', 'ggg', '0', null, '0', '2016-11-24 23:02:17', 'ggg', null, null, null, 'The Labrador Retriever, also Labrador, is a type of retriever-gun dog. ', 'VtBn25eWMXWe1xlyTn2SUzkY8LwZJit5223EawhUzijyOGaJDM', '50X7DA3jyhVxprHvwTKujUrkkhDoEosB7DpXwEkGBpVCmfxMnOdapekikwzV', '2016-11-25 00:21:39', '13');
INSERT INTO `users` VALUES ('21', 'qqq', '$2y$10$dS4Qbh8XUc4QJZm/LqOxAuql7WoTQnOusL5zCmcOxWaC0BaIDzDfG', null, 'qqq@qq.com', '2', '2', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', '2016-11-24 23:45:58', null, null, null, null, null, 'nHBX8y18PFgoBSczT20h7K2uOGwGrgFFMIqxqfBh0VP4wQCIyc', 'xyUpN9FGJLtM9IVS9Ju6IM1WAOldAE2EWBLgUcoxXZ1Cm36a9KuDg76JLOUk', '2016-11-24 23:46:55', null);

-- ----------------------------
-- Table structure for votes
-- ----------------------------
DROP TABLE IF EXISTS `votes`;
CREATE TABLE `votes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '投票编号',
  `postid` int(11) NOT NULL COMMENT '所属帖子编号',
  `choice` varchar(100) NOT NULL COMMENT '一个投票选项',
  `picid` int(11) DEFAULT NULL COMMENT '选项图片编',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '票数',
  `userid` text COMMENT '投过该项的用户编号列表，逗号分隔',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of votes
-- ----------------------------
