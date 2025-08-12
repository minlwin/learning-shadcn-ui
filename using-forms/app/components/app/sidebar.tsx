import { Link } from "react-router";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";
import { CheckSquare, ChevronDown, Code, Files, Folder, PenSquare, type LucideProps } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export default function AppSidebar() {
    return (
        <Sidebar variant="floating" color="white">
            <SidebarHeader>
                <h2 className="text-2xl pl-2 pt-2">Using Form</h2>
            </SidebarHeader>
            <SidebarContent>
                {MENU.map((group, groupIndex) => 
                    <SidebarGroup key={`Group-${groupIndex}`}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item, itemIndex) => 
                                    <AppMenuItem key={`Menu-${groupIndex}-${itemIndex}`} menu={item} />
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>
        </Sidebar>
    )
}

function AppMenuItem({menu} : {menu : MenuItem}) {

    if(menu.type == 'single') {
        return <SingleMenuItem menu={menu as MenuItemSingle} />
    }

    return (
        <MultipleMenuItem menu={menu as MenuItemMultiple} />
    )
}

function SingleMenuItem({menu} : {menu : MenuItemSingle}) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link to={menu.url}>
                    {menu.icon ? <menu.icon /> : <Code />}
                    {menu.title}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

function MultipleMenuItem({menu} : {menu : MenuItemMultiple}) {

    function toUrl(item: MenuItem) {
        const menu = item as MenuItemSingle
        return menu.url
    }

    return (
        <SidebarMenuItem>
            <Collapsible className="group/collapsible">
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        {menu.icon ? <menu.icon /> : <Folder />}
                        <span>{menu.title}</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {menu.items.map((item, index) => 
                            <SidebarMenuSubItem key={`sub-${index}`}>
                                <SidebarMenuSubButton asChild>
                                    <Link to={toUrl(item)}>
                                        {item.title}
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        )}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    )
}

const MENU:MenuGroup[] = [
    {
        title: "Basic Usages",
        items: [
            {type : "multiple", title: 'Inputs', icon: PenSquare, items : [
                {type : "single", title: 'Text Input', url : '/basic/input/text'},
                {type : "single", title: 'Date Input', url : '/basic/input/date'},
                {type : "single", title: 'Text Area', url : '/basic/input/textarea'},
            ]},
            {type : "multiple", title: 'Selects', icon: CheckSquare, items : [
                {type : "single", title: 'Select One', url : '/basic/select/one'},
                {type : "single", title: 'Select Many', url : '/basic/select/many'},
            ]},
            {type : "multiple", title: 'Files', icon: Files, items : [
                {type : "single", title: 'Text File', url : '/basic/file/text'},
                {type : "single", title: 'Image File', url : '/basic/file/image-one'},
                {type : "single", title: 'Multiple Image Files', url : '/basic/file/image-many'},
            ]},
        ]
    },
    {
        title: "Essentials",
        items: [
            {type : 'single', title : "Schema Validation", url: '/essential/schema'},
            {type : 'multiple', title : "UI Form Components", items : [
                {type : "single", title: 'Text Input', url : '/essential/text'},
                {type : "single", title: 'Check Box', url : '/essential/check'},
                {type : "single", title: 'Radio Group', url : '/essential/radio'},
                {type : "single", title: 'Date Input', url : '/essential/date'},
                {type : "single", title: 'Select', url : '/essential/select'},
            ]},
        ]
    },
    {
        title: "Dynamic Form",
        items: [
            {type : "single", title: 'Form Group', url : '/dynamic/group'},
            {type : "single", title: 'Dynamic Form Array', url : '/dynamic/array'},
            {type : "single", title: 'Dynamic Form Field', url : '/dynamic/item'},
        ]
    },
]

type MenuGroup = {
    title: string,
    items : MenuItem[]
}


type MenuItemSingle = {
    url: string
} & {
    title : string
    type : 'single' | 'multiple'
    icon? : React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

type MenuItemMultiple = {
    items: MenuItem[]
} & {
    title : string
    type : 'single' | 'multiple'
    icon? : React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

type MenuItem = MenuItemSingle | MenuItemMultiple
