import { load as loadYaml } from "js-yaml";
import { GCPObjects, ProjectInfo } from './process_object';
import { resolve } from 'path';
const log4js = require("log4js");
const fs = require('fs');

log4js.configure({
  appenders: { projectLogger: {type: "file", filename:"typescriptL.log"} },
  categories: { default: { appenders: ["projectLogger"], level:"info"} }
});

export const logger = log4js.getLogger();

export function readYamlFileSync(filePath:String): any{
  return loadYaml(fs.readYamlFileSync(filePath, 'utf-8'));
}

export function readDir(dirPath:string): ProjectInfo {
  let projectInfo: ProjectInfo = {};
  let gcpObjects: GCPObjects[] = [];
  try {
    logger.info("DirPath is: ", dirPath);
    
    fs.readdirSync(dirPath).forEach((file: string) => {
      const resolvedFilePath = resolve(dirPath, file);
      logger.info(resolvedFilePath);
      if(file.includes("project.yaml")){
        projectInfo = (<ProjectInfo> readYamlFileSync(resolvedFilePath));
      }else{
        gcpObjects.push(<GCPObjects> readYamlFileSync(resolvedFilePath));
      }
    });
    projectInfo.gcpObjects = gcpObjects;
    logger.info("ProjectInfo: ", projectInfo);
  } catch (error){
    logger.error(error);
  }
  return projectInfo;
}
