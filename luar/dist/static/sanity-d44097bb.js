import{defineConfig as t,renderStudio as e}from"sanity";import{structureTool as o}from"sanity/structure";import{visionTool as r}from"@sanity/vision";const i={name:"person",title:"Person",type:"document",fields:[{name:"fullName",title:"Full name",type:"string"},{name:"portrait",title:"Portrait",type:"image",options:{hotspot:!0}}]},n=[i],s=t({name:"default",title:"Luar",projectId:"2yrpcu57",dataset:"production",plugins:[o(),r()],schema:{types:n}});e(document.getElementById("sanity"),s,{reactStrictMode:!1,basePath:"/"});