import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout('./components/layout/main.tsx', [
        index('./routes/home.tsx'),
        ...prefix("basic", [
            layout('./components/layout/basic-input.tsx', [
                ...prefix("input", [
                    route("text", "./routes/basic/inputs/text-input.tsx"),
                    route("textarea", "./routes/basic/inputs/text-area.tsx"),
                    route("date", "./routes/basic/inputs/date-input.tsx"),
                ]),
                ...prefix("select", [
                   route("one", "./routes/basic/select/select-one.tsx"),
                   route("many", "./routes/basic/select/select-many.tsx"),
                ]),
            ...prefix("file", [
                route("text", "./routes/basic/files/text.tsx"),
                route("image-one", "./routes/basic/files/image-single.tsx"),
                route("image-many", "./routes/basic/files/image-multiple.tsx"),
            ]),
            ])
        ]),
        ...prefix('essential', [
            layout('./components/layout/essential.tsx', [
                route("schema", "./routes/essentials/using-schema.tsx"),
                route("text", "./routes/essentials/ui/ui-text-input.tsx"),
                route("date", "./routes/essentials/ui/ui-date-input.tsx"),
                route("select", "./routes/essentials/ui/ui-select.tsx"),
                route("radio", "./routes/essentials/ui/ui-radio-group.tsx"),
            ])
        ]),
        ...prefix('dynamic', [
            layout('./components/layout/dynamic.tsx', [
                route("array", "./routes/dynamic/form-array.tsx"),
                route("group", "./routes/dynamic/form-group.tsx"),
                route("item", "./routes/dynamic/form-item.tsx"),
            ])
        ])
    ])
] satisfies RouteConfig;
